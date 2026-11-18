/* Criação orientada: sugestão de atributos (tdtSugerirAtributos em engine.js).
   Regras: PT p.33–39 (atributos 0 a 5, 1 ponto cada, até 5 na criação) e p.130 (Iniciante 10, Herói 20, Veterano 35).
   Conta feita à mão nos comentários. Os arquétipos vêm de rules.js, então os testes de faixa percorrem todos. */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();
const sugerir = (nivel, arq) => avaliar(ctx, `tdtSugerirAtributos(${JSON.stringify(nivel)}, ${JSON.stringify(arq)})`);
const NIVEIS = { iniciante: 10, heroi: 20, veterano: 35 };
const arquetipos = avaliar(ctx, "TDT_RULES.arquetipos.map(a => ({ id: a.id, custo: a.custo }))");

teste("Iniciante com Humano (custo 0): orçamento 10, sugestão 4-3-3 (P4 H3 R3), sem sobra", () => {
  // Mínimo 1 em cada (3); os 7 restantes em rodízio P, H, R, P, H, R, P.
  const s = sugerir("iniciante", "humano");
  assert.deepStrictEqual([s.P, s.H, s.R, s.restante], [4, 3, 3, 0]);
});

teste("Iniciante com Kemono (custo 1): orçamento 9, sugestão 3-3-3", () => {
  const s = sugerir("iniciante", "kemono");
  assert.deepStrictEqual([s.P, s.H, s.R, s.custoArquetipo, s.restante], [3, 3, 3, 1, 0]);
});

teste("Iniciante com Qareen (custo 3): orçamento 7, sugestão 3-2-2", () => {
  const s = sugerir("iniciante", "qareen");
  assert.deepStrictEqual([s.P, s.H, s.R, s.restante], [3, 2, 2, 0]);
});

teste("Herói com Humano: orçamento 20, atributos no teto 5-5-5, sobram 5 para perícias e vantagens", () => {
  // Teto da criação: 3 atributos × 5 = 15. Os 5 que sobram não cabem em atributo.
  const s = sugerir("heroi", "humano");
  assert.deepStrictEqual([s.P, s.H, s.R, s.gastoAtributos, s.restante], [5, 5, 5, 15, 5]);
});

teste("Veterano com Humano: 35 pontos, atributos 5-5-5, sobram 20", () => {
  const s = sugerir("veterano", "humano");
  assert.deepStrictEqual([s.P, s.H, s.R, s.restante], [5, 5, 5, 20]);
});

teste("para cada nível e cada arquétipo com custo verificado: P+H+R + custo + restante = pontos do nível", () => {
  for(const nivel of Object.keys(NIVEIS)){
    for(const a of arquetipos){
      if(!Number.isInteger(a.custo)) continue;
      const s = sugerir(nivel, a.id);
      assert.ok(s, "sem sugestão para " + nivel + " / " + a.id);
      const somaAtributos = s.P + s.H + s.R;
      assert.strictEqual(somaAtributos + s.custoArquetipo + s.restante, NIVEIS[nivel], nivel + " / " + a.id + ": total não bate");
      assert.strictEqual(s.pontosNivel, NIVEIS[nivel]);
    }
  }
});

teste("valores respeitam os limites: cada atributo entre 0 e 5, restante nunca negativo", () => {
  for(const nivel of Object.keys(NIVEIS)){
    for(const a of arquetipos){
      if(!Number.isInteger(a.custo)) continue;
      const s = sugerir(nivel, a.id);
      ["P", "H", "R"].forEach(k => assert.ok(s[k] >= 0 && s[k] <= 5, nivel + " / " + a.id + ": " + k + "=" + s[k]));
      assert.ok(s.restante >= 0, nivel + " / " + a.id + ": restante negativo");
    }
  }
});

teste("sugestão equilibrada: diferença máxima de 1 entre atributos, e pelo menos 1 em cada quando o orçamento permite", () => {
  for(const nivel of Object.keys(NIVEIS)){
    for(const a of arquetipos){
      if(!Number.isInteger(a.custo)) continue;
      const s = sugerir(nivel, a.id);
      const v = [s.P, s.H, s.R];
      assert.ok(Math.max(...v) - Math.min(...v) <= 1, nivel + " / " + a.id + ": desequilibrada " + v);
      const orcamento = NIVEIS[nivel] - a.custo;
      if(orcamento >= 3) assert.ok(Math.min(...v) >= 1, nivel + " / " + a.id + ": atributo zerado com orçamento " + orcamento);
    }
  }
});

teste("sem nível predefinido, arquétipo vazio ou desconhecido: null", () => {
  assert.strictEqual(sugerir("livre", "humano"), null);
  assert.strictEqual(sugerir("", "humano"), null);
  assert.strictEqual(sugerir("iniciante", ""), null);
  assert.strictEqual(sugerir("iniciante", "inexistente"), null);
});

teste("arquétipo com custo não verificado (null) devolve null, sem palpite", () => {
  const c2 = criarAmbiente();
  c2.TDT_RULES.arquetipos.push({ id: "teste_sem_custo", nome: "Teste", custo: null, poderes: [], fonte: "NÃO VERIFICADO" });
  const r = avaliar(c2, `tdtSugerirAtributos("iniciante", "teste_sem_custo")`);
  assert.strictEqual(r, null);
});

sair("sugestão de atributos");
