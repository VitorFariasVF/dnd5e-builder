/* Sub-raças, variantes, escolhas raciais, tamanho e restrição do Druida (D&D 5e 2014).
   Casos conferidos à mão: 3 personagens completos (ver bloco "conferidos à mão").
   Sai com código != 0 se algo falhar. Rodar: cd dnd5e && node tests/test_racas.js */
const fs = require('fs');
const vm = require('vm');
const base = require('path').join(__dirname, '..');

let code = '';
for (const f of ['state.js', 'rules.js', 'rules-racas.js', 'rules-engine.js', 'validator.js']) {
  code += '\n// FILE ' + f + '\n' + fs.readFileSync(base + '/' + f, 'utf8') + '\n';
}
const ctx = { console, process, require };
vm.createContext(ctx);
vm.runInContext(code, ctx);

const get = expr => vm.runInContext(expr, ctx);
const run = (expr) => vm.runInContext(expr, ctx);
const clone = v => JSON.parse(JSON.stringify(v));

const resultados = [];
function check(nome, cond, detalhe) {
  resultados.push({ name: nome, ok: !!cond, detalhe: cond ? undefined : detalhe });
}
function semErro(msg) { return msg === null || msg === undefined; }

/* Helpers de estado: cada teste monta o seu personagem. */
function setEdicao(ed) { run(`state.regras = ${JSON.stringify(ed)}; aplicarCatalogoRegras(${JSON.stringify(ed)});`); }
function setPers(obj) { run(`state.personagem = Object.assign(createInitialState().personagem, ${JSON.stringify(obj)});`); }
function pers(obj) { return Object.assign({ raca: null, subraca: null, escolhasRaciais: { atributos: [], pericia: '', talento: '', ancestral: '' } }, obj); }
const ESC0 = { atributos: [], pericia: '', talento: '', ancestral: '' };

setEdicao('2014');

/* ---------- 1. Meio-Elfo ---------- */
{
  const p = pers({ raca: 'meio_elfo', escolhasRaciais: { ...ESC0, atributos: ['forca', 'destreza'] } });
  const r = clone(run(`resolverRaca('meio_elfo', ${JSON.stringify(p)})`));
  check('Meio-Elfo: Carisma +2 e dois +1 diferentes (força e destreza)',
    r.bonusAtributos.carisma === 2 && r.bonusAtributos.forca === 1 && r.bonusAtributos.destreza === 1 && Object.keys(r.bonusAtributos).length === 3,
    JSON.stringify(r.bonusAtributos));
  check('Meio-Elfo: escolhas válidas não geram erro nem pendência',
    r.erros.length === 0 && r.pendencias.length === 0, JSON.stringify(r));
  const comCarisma = clone(run(`resolverRaca('meio_elfo', ${JSON.stringify(pers({ raca: 'meio_elfo', escolhasRaciais: { ...ESC0, atributos: ['carisma', 'forca'] } }))})`));
  check('Meio-Elfo: recusa Carisma como um dos dois +1', comCarisma.erros.some(m => /Carisma/.test(m)), JSON.stringify(comCarisma.erros));
  check('Meio-Elfo: não aplica o +1 de Carisma recusado', comCarisma.bonusAtributos.carisma === 2 && !comCarisma.bonusAtributos.forca, JSON.stringify(comCarisma.bonusAtributos));
  const repetido = clone(run(`resolverRaca('meio_elfo', ${JSON.stringify(pers({ raca: 'meio_elfo', escolhasRaciais: { ...ESC0, atributos: ['forca', 'forca'] } }))})`));
  check('Meio-Elfo: recusa dois +1 no mesmo atributo', repetido.erros.some(m => /diferentes/.test(m)), JSON.stringify(repetido.erros));
  const vazio = clone(run(`resolverRaca('meio_elfo', ${JSON.stringify(pers({ raca: 'meio_elfo' }))})`));
  check('Meio-Elfo: sem escolhas vira pendência', vazio.pendencias.length === 1, JSON.stringify(vazio.pendencias));
  check('Meio-Elfo: validarEscolhasRaciais recusa o caso sem escolhas',
    run(`validarEscolhasRaciais(${JSON.stringify(pers({ raca: 'meio_elfo' }))})`) !== null);
  check('Meio-Elfo: validarEscolhasRaciais aceita o caso válido',
    semErro(run(`validarEscolhasRaciais(${JSON.stringify(p)})`)));
}

/* ---------- 2. Sub-raças: bônus, traços e deslocamento ---------- */
const casosSub = [
  { raca: 'anao', sub: 'colina', bonus: { constituicao: 2, sabedoria: 1 }, desl: 25, pv: 1, tam: 'Médio' },
  { raca: 'anao', sub: 'montanha', bonus: { constituicao: 2, forca: 2 }, desl: 25, pv: 0, tam: 'Médio', naoVerif: true },
  { raca: 'elfo', sub: 'alto', bonus: { destreza: 2, inteligencia: 1 }, desl: 30, pv: 0, tam: 'Médio', naoVerif: true },
  { raca: 'elfo', sub: 'floresta', bonus: { destreza: 2, sabedoria: 1 }, desl: 35, pv: 0, tam: 'Médio', naoVerif: true },
  { raca: 'elfo', sub: 'drow', bonus: { destreza: 2, carisma: 1 }, desl: 30, pv: 0, tam: 'Médio', naoVerif: true },
  { raca: 'halfling', sub: 'pes_leves', bonus: { destreza: 2, carisma: 1 }, desl: 25, pv: 0, tam: 'Pequeno', naoVerif: true },
  { raca: 'halfling', sub: 'robusto', bonus: { destreza: 2, constituicao: 1 }, desl: 25, pv: 0, tam: 'Pequeno', naoVerif: true },
  { raca: 'gnomo', sub: 'floresta', bonus: { inteligencia: 2, destreza: 1 }, desl: 25, pv: 0, tam: 'Pequeno', naoVerif: true },
  { raca: 'gnomo', sub: 'rochas', bonus: { inteligencia: 2, constituicao: 1 }, desl: 25, pv: 0, tam: 'Pequeno', naoVerif: true }
];
casosSub.forEach(c => {
  const r = clone(run(`resolverRaca('${c.raca}', ${JSON.stringify(pers({ raca: c.raca, subraca: c.sub }))})`));
  const ok = JSON.stringify(Object.entries(r.bonusAtributos).sort()) === JSON.stringify(Object.entries(c.bonus).sort());
  check(`Sub-raça ${c.raca}/${c.sub}: bônus de atributo`, ok, JSON.stringify(r.bonusAtributos));
  check(`Sub-raça ${c.raca}/${c.sub}: deslocamento ${c.desl}`, r.deslocamento === c.desl, r.deslocamento);
  check(`Sub-raça ${c.raca}/${c.sub}: tamanho ${c.tam}`, r.tamanho === c.tam, r.tamanho);
  check(`Sub-raça ${c.raca}/${c.sub}: traços próprios aparecem`, r.traits.length > 0 && r.erros.length === 0 && r.pendencias.length === 0, JSON.stringify(r));
  check(`Sub-raça ${c.raca}/${c.sub}: fonte marcada conforme as fontes conferidas`,
    typeof r.fonte === 'string' && (c.naoVerif ? /NÃO VERIFICADO/.test(r.fonte) : !/NÃO VERIFICADO/.test(r.fonte)), r.fonte);
});
{
  const colina = clone(run(`resolverRaca('anao', ${JSON.stringify(pers({ raca: 'anao', subraca: 'colina' }))})`));
  check('Anão da Colina: PV +1 por nível (valor do traço)', colina.pvPorNivel === 1, colina.pvPorNivel);
  const semSub = clone(run(`resolverRaca('elfo', ${JSON.stringify(pers({ raca: 'elfo' }))})`));
  check('Elfo sem sub-raça: pendência obrigatória', semSub.pendencias.some(m => /sub-raça/.test(m)), JSON.stringify(semSub.pendencias));
  check('Elfo sem sub-raça: validador recusa', run(`validarEscolhasRaciais(${JSON.stringify(pers({ raca: 'elfo' }))})`) !== null);
  check('Elfo com sub-raça: validador aceita', semErro(run(`validarEscolhasRaciais(${JSON.stringify(pers({ raca: 'elfo', subraca: 'alto' }))})`)));
  const tiefling = clone(run(`resolverRaca('tiefling', ${JSON.stringify(pers({ raca: 'tiefling' }))})`));
  check('Tiefling: sem sub-raça (PHB 2014 não tem), sem pendência', tiefling.pendencias.length === 0 && tiefling.subraca === null, JSON.stringify(tiefling));
}

/* ---------- 3. Humano Variante ---------- */
{
  const ok = pers({ raca: 'humano', subraca: 'variante', escolhasRaciais: { atributos: ['carisma', 'sabedoria'], pericia: 'Atletismo', talento: 'alerta', ancestral: '' } });
  const r = clone(run(`resolverRaca('humano', ${JSON.stringify(ok)})`));
  check('Humano Variante: +1 em dois atributos escolhidos e nada nos demais',
    r.bonusAtributos.carisma === 1 && r.bonusAtributos.sabedoria === 1 && Object.keys(r.bonusAtributos).length === 2, JSON.stringify(r.bonusAtributos));
  check('Humano Variante: perícia e talento escolhidos entram no resultado',
    r.pericias.includes('Atletismo') && r.talentos.includes('alerta'), JSON.stringify(r));
  check('Humano Variante: escolhas válidas sem erro', r.erros.length === 0 && r.pendencias.length === 0, JSON.stringify(r));
  const padrao = clone(run(`resolverRaca('humano', ${JSON.stringify(pers({ raca: 'humano' }))})`));
  check('Humano padrão: +1 em todos e sem escolhas', Object.values(padrao.bonusAtributos).every(v => v === 1) && Object.keys(padrao.bonusAtributos).length === 6 && padrao.pendencias.length === 0, JSON.stringify(padrao));
  const mesmoAtributo = clone(run(`resolverRaca('humano', ${JSON.stringify(pers({ raca: 'humano', subraca: 'variante', escolhasRaciais: { ...ESC0, atributos: ['forca', 'forca'], pericia: 'Atletismo', talento: 'alerta' } })) })`));
  check('Humano Variante: recusa +1 duplicado', mesmoAtributo.erros.some(m => /diferentes/.test(m)), JSON.stringify(mesmoAtributo.erros));
  const talentoComAtributo = clone(run(`resolverRaca('humano', ${JSON.stringify(pers({ raca: 'humano', subraca: 'variante', escolhasRaciais: { atributos: ['forca', 'destreza'], pericia: 'Atletismo', talento: 'atleta', ancestral: '' } }))})`));
  check('Humano Variante: talento com escolha de atributo fica fora (recusado)', talentoComAtributo.erros.some(m => /talento/.test(m)), JSON.stringify(talentoComAtributo.erros));
  const repetePericiaDaOrigem = pers({ raca: 'humano', subraca: 'variante', origem: 'acolito', escolhasRaciais: { ...ESC0, atributos: ['forca', 'destreza'], pericia: 'Intuição', talento: 'alerta' } });
  check('Humano Variante: perícia repetida da origem (Acólito: Intuição) é recusada pelo validador',
    run(`validarEscolhasRaciais(${JSON.stringify(repetePericiaDaOrigem)})`) === 'Não repita perícias já recebidas pela origem.', run(`validarEscolhasRaciais(${JSON.stringify(repetePericiaDaOrigem)})`));
  const semPericia = clone(run(`resolverRaca('humano', ${JSON.stringify(pers({ raca: 'humano', subraca: 'variante', escolhasRaciais: { atributos: ['forca', 'destreza'], pericia: '', talento: 'alerta', ancestral: '' } }))})`));
  check('Humano Variante: perícia faltando vira pendência', semPericia.pendencias.some(m => /perícia/.test(m)), JSON.stringify(semPericia.pendencias));
}

/* ---------- 4. Draconato: ancestral, arma de sopro e resistência ---------- */
{
  const verde = clone(run(`resolverRaca('draconato', ${JSON.stringify(pers({ raca: 'draconato', escolhasRaciais: { ...ESC0, ancestral: 'verde' } }))})`));
  check('Draconato: ancestral Verde dá Venenoso, cone de 15 pés e salvaguarda de Constituição',
    verde.traits.includes('Arma de Sopro (cone de 15 pés; salvaguarda de Constituição)') && verde.traits.includes('Resistência a Dano (Venenoso)'),
    JSON.stringify(verde.traits));
  check('Draconato: bônus Força +2 e Carisma +1', verde.bonusAtributos.forca === 2 && verde.bonusAtributos.carisma === 1 && Object.keys(verde.bonusAtributos).length === 2, JSON.stringify(verde.bonusAtributos));
  const bronze = clone(run(`resolverRaca('draconato', ${JSON.stringify(pers({ raca: 'draconato', escolhasRaciais: { ...ESC0, ancestral: 'bronze' } }))})`));
  check('Draconato: ancestral Bronze dá Elétrico, linha de 5 x 30 pés e Destreza',
    bronze.traits.includes('Arma de Sopro (linha de 5 x 30 pés; salvaguarda de Destreza)') && bronze.traits.includes('Resistência a Dano (Elétrico)'), JSON.stringify(bronze.traits));
  const semAncestral = clone(run(`resolverRaca('draconato', ${JSON.stringify(pers({ raca: 'draconato' }))})`));
  check('Draconato: sem ancestral vira pendência', semAncestral.pendencias.some(m => /ancestral/.test(m)), JSON.stringify(semAncestral.pendencias));
  check('Draconato: ancestral inválido é recusado', run(`resolverRaca('draconato', ${JSON.stringify(pers({ raca: 'draconato', escolhasRaciais: { ...ESC0, ancestral: 'xyz' } }))}).erros.length`) === 1);
}

/* ---------- 5. Tamanho no catálogo de 2014 ---------- */
{
  const tam = clone(run(`Object.fromEntries(Object.entries(RACES).map(([k,v]) => [k, v.tamanho]))`));
  check('Tamanho 2014: toda espécie tem tamanho definido', Object.values(tam).every(v => typeof v === 'string'), JSON.stringify(tam));
  check('Tamanho 2014: Halfling e Gnomo são Pequenos, os demais Médios',
    tam.halfling === 'Pequeno' && tam.gnomo === 'Pequeno' && tam.anao === 'Médio' && tam.elfo === 'Médio' && tam.humano === 'Médio' && tam.draconato === 'Médio' && tam.tiefling === 'Médio' && tam.meio_elfo === 'Médio' && tam.meio_orc === 'Médio', JSON.stringify(tam));
}

/* ---------- 6. Persistência: aplicar no personagem e ler de volta ---------- */
{
  setPers({ raca: 'elfo', subraca: 'floresta', escolhasRaciais: { atributos: [], pericia: '', talento: '', ancestral: '' } });
  run(`aplicarRacaNoPersonagem(state.personagem)`);
  const p = clone(run('state.personagem'));
  check('aplicarRacaNoPersonagem: grava bônus, deslocamento e tamanho no personagem',
    p.bonusRaciais.destreza === 2 && p.bonusRaciais.sabedoria === 1 && p.deslocamento === 35 && p.tamanho === 'Médio' && p.subracaNome === 'Elfo da Floresta', JSON.stringify(p));
  run(`state.personagem.subraca = null; state.personagem.raca = 'elfo';`);
  check('validarRaca reporta sub-raça ausente depois de limpar a escolha', run(`validarRaca()`) !== null);
}
{
  const legado = clone(run(`(function(){ const o = JSON.parse(JSON.stringify({regras:"2014", modo:"A", personagem:{raca:"anao"}})); Object.keys(state).forEach(k=>delete state[k]); Object.assign(state, o); ensureStateShape(); return state.personagem; })()`));
  check('Backup antigo sem campos novos: ensureStateShape completa escolhas e listas',
    legado.escolhasRaciais && Array.isArray(legado.escolhasRaciais.atributos) && Array.isArray(legado.periciasRaciais) && legado.subraca === null, JSON.stringify(legado));
  check('Backup com escolhas raciais: as escolhas sobrevivem ao JSON', (() => {
    const o = { regras: '2014', modo: 'A', personagem: { raca: 'meio_elfo', subraca: null, escolhasRaciais: { atributos: ['forca', 'destreza'], pericia: '', talento: '', ancestral: '' } } };
    const volta = JSON.parse(JSON.stringify(o));
    run(`Object.keys(state).forEach(k=>delete state[k]); Object.assign(state, ${JSON.stringify(volta)}); ensureStateShape();`);
    const e = clone(run('state.personagem.escolhasRaciais'));
    return e.atributos.join(',') === 'forca,destreza';
  })());
  setPers({});
}

/* ---------- 7. Conferidos à mão: três personagens completos (regras de atributo do motor) ---------- */
const BASE_STANDARD = { forca: 15, destreza: 14, constituicao: 13, inteligencia: 12, sabedoria: 10, carisma: 8 };
function finaisPara(obj) {
  setPers(Object.assign({ atributosBase: BASE_STANDARD, nivel: 1, classe: null }, obj));
  run(`aplicarRacaNoPersonagem(state.personagem)`);
  return clone(run(`resolveCharacterRules(state.personagem).resolved.abilityScores.final`));
}
{
  /* (a) Elfo da Floresta: base 15/14/13/12/10/8, +2 Des, +1 Sab.
     Esperado: Força 15, Destreza 16, Constituição 13, Inteligência 12, Sabedoria 11, Carisma 8. */
  const f = finaisPara({ raca: 'elfo', subraca: 'floresta' });
  check('Conferido (a) Elfo da Floresta: atributos finais 15/16/13/12/11/8',
    f.forca === 15 && f.destreza === 16 && f.constituicao === 13 && f.inteligencia === 12 && f.sabedoria === 11 && f.carisma === 8, JSON.stringify(f));
}
{
  /* (b) Meio-Elfo com +1 em Força e Destreza: Força 16, Destreza 15, Constituição 13, Inteligência 12, Sabedoria 10, Carisma 10. */
  const f = finaisPara({ raca: 'meio_elfo', escolhasRaciais: { ...ESC0, atributos: ['forca', 'destreza'] } });
  check('Conferido (b) Meio-Elfo: atributos finais 16/15/13/12/10/10',
    f.forca === 16 && f.destreza === 15 && f.constituicao === 13 && f.inteligencia === 12 && f.sabedoria === 10 && f.carisma === 10, JSON.stringify(f));
}
{
  /* (c) Draconato Preto (Força +2, Carisma +1): Força 17, Destreza 14, Constituição 13, Inteligência 12, Sabedoria 10, Carisma 9. */
  const f = finaisPara({ raca: 'draconato', escolhasRaciais: { ...ESC0, ancestral: 'preto' } });
  check('Conferido (c) Draconato: atributos finais 17/14/13/12/10/9',
    f.forca === 17 && f.destreza === 14 && f.constituicao === 13 && f.inteligencia === 12 && f.sabedoria === 10 && f.carisma === 9, JSON.stringify(f));
}
{
  /* (d) Humano Variante com +1 em Carisma e Sabedoria, sobre base 15/14/13/12/10/8: Car 9, Sab 11. */
  const f = finaisPara({ raca: 'humano', subraca: 'variante', escolhasRaciais: { ...ESC0, atributos: ['carisma', 'sabedoria'], pericia: 'Atletismo', talento: 'alerta' } });
  check('Conferido (d) Humano Variante: atributos finais 15/14/13/12/11/9',
    f.forca === 15 && f.destreza === 14 && f.constituicao === 13 && f.inteligencia === 12 && f.sabedoria === 11 && f.carisma === 9, JSON.stringify(f));
}

/* ---------- 8. Anão da Colina: PV por nível passa pelo motor de PV ---------- */
{
  /* Guerreiro nível 5, Constituição 14 (mod +2), dado de vida 10: sem traço 44 PV; com +1 por nível, 49. */
  const sem = run(`resolveHitPoints({classKey:'guerreiro', level:5, racePvPorNivel:0, personagem:{dadoVida:10, atributos:{constituicao:14}}}, {final:{constituicao:14}}).max`);
  const com = run(`resolveHitPoints({classKey:'guerreiro', level:5, racePvPorNivel:1, personagem:{dadoVida:10, atributos:{constituicao:14}}}, {final:{constituicao:14}}).max`);
  check('Anão da Colina: PV máximo sem traço = 44 (guerreiro 5, Con 14)', sem === 44, sem);
  check('Anão da Colina: PV máximo com +1 por nível = 49', com === 49, com);
}

/* ---------- 9. Restrição do Druida: metal não, categorias de proficiência intactas ---------- */
{
  setEdicao('2014');
  const base = { modo: 'A', classe: 'druida', proficienciasClasseEfetivas: ['Armaduras leves', 'Armaduras médias', 'Escudos', 'Adagas'], combate: { armadura: 'couro', escudo: false, armaPrincipal: 'adaga', armaSecundaria: 'adaga', classeArmadura: 10, iniciativa: 0, ataques: [] } };
  run(`state.modo = 'A'; state.regras = '2014';`);
  setPers(base);
  check('Druida 2014: armadura de couro (leve, sem metal) passa', semErro(run(`validarCombate()`)), run(`validarCombate()`));
  run(`state.personagem.combate.armadura = 'gibao_peles'`);
  check('Druida 2014: gibão de peles (média, de couro, sem metal) passa', semErro(run(`validarCombate()`)), run(`validarCombate()`));
  run(`state.personagem.combate.armadura = 'peitoral'`);
  check('Druida 2014: peitoral (média de metal) é recusado com a mensagem da classe',
    run(`validarCombate()`) === 'Druidas não usam armadura de metal.', run(`validarCombate()`));
  run(`state.personagem.combate.armadura = 'cota_aneis'`);
  check('Druida 2014: cota de anéis (pesada de metal) é recusada pela proficiência antes da restrição',
    run(`validarCombate()`) === 'A classe não é proficiente com a armadura escolhida.', run(`validarCombate()`));
  check('Druida: a categoria "Armaduras médias" continua na lista de proficiências',
    run(`state.personagem.proficienciasClasseEfetivas.includes('Armaduras médias')`) === true);
  check('Druida: a regra não muda a categoria de proficiência do motor (armadura média ainda casa)',
    run(`personagemEhProficienteComArmadura(ARMORS.peitoral)`) === true);
  run(`state.personagem.combate.armadura = 'peitoral'; state.regras = '2024';`);
  check('Druida 2024: a restrição não vale (edição 2024 fica como estava)', semErro(run(`validarCombate()`)), run(`validarCombate()`));
  run(`state.regras = '2014';`);
  run(`state.regras = '2014'; state.modo = 'B';`);
  check('Druida modo B: validação de combate livre, sem recusa', semErro(run(`validarCombate()`)), run(`validarCombate()`));
  run(`state.modo = 'A'; state.personagem.classe = 'guerreiro'; state.personagem.proficienciasClasseEfetivas = ['Armaduras leves','Armaduras médias','Armaduras pesadas','Escudos','Armas simples','Armas marciais']; state.personagem.combate.armadura = 'peitoral';`);
  check('Guerreiro com peitoral: a restrição do druida não se aplica', semErro(run(`validarCombate()`)), run(`validarCombate()`));
}

/* ---------- 10. Edição 2024 e catálogo 2014 preservado ---------- */
{
  setEdicao('2024');
  const r24 = clone(run(`resolverRaca('elfo', ${JSON.stringify(pers({ raca: 'elfo' }))})`));
  check('2024: elfo sem sub-raça não gera pendência nem bônus de espécie', r24.pendencias.length === 0 && Object.keys(r24.bonusAtributos).length === 0, JSON.stringify(r24));
  check('2024: catálogo de espécies é o de 2024 (sem Meio-Elfo)', run(`RACES.meio_elfo === undefined && !!RACES.aasimar`) === true);
  check('2024: escolhas de Humano Variante não aparecem', run(`racaSubracoes('humano') === null`) === true);
  setEdicao('2014');
  check('Volta ao 2014: Meio-Elfo com Carisma +2 e escolhas', run(`RACES.meio_elfo.bonusAtributos.carisma`) === 2);
  check('Volta ao 2014: sub-raças voltam a valer', run(`racaSubracoes('anao') !== null && racaOpcaoSubraca('anao','colina').nome`) === 'Anão da Colina');
}

/* ---------- 11. Perícia racial não pode repetir perícia de classe ---------- */
{
  setEdicao('2014');
  setPers({ modo: 'A', classe: 'guerreiro', raca: 'humano', periciasOrigem: [], periciasRaciais: ['Atletismo'], periciasClasseSelecionadas: ['Atletismo', 'Percepção'] });
  run(`state.modo = 'A';`);
  check('Perícia racial repetida em perícia de classe é recusada',
    run(`validarPericias()`) === 'Não repita perícias já recebidas pela raça.', run(`validarPericias()`));
}

/* ---------- Saída no formato dos outros testes ---------- */
console.log(JSON.stringify(resultados, null, 2));
const total = resultados.length;
const falhas = resultados.filter(r => !r.ok);
console.log(`Total: ${total} | ok: ${total - falhas.length} | falhas: ${falhas.length}`);
if (falhas.length) {
  falhas.forEach(f => console.error('FALHA:', f.name, '->', f.detalhe));
  process.exit(1);
}
