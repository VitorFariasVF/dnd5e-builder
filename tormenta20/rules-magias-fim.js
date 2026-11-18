/* tormenta20/rules-magias-fim.js: fecha o catálogo de magias. Carregado depois de rules-magias.js, rules-magias-1-2.js e rules-magias-3-5.js.
   1) Se um id aparece mais de uma vez, vale o último (o dado do livro substitui o dado antigo de rules-magias.js).
   2) Magias que já têm entrada completa saem de T20_MAGIAS_PENDENTES (que só guarda o que foi visto no índice).
   3) Aceita tipo "universal", além de "arcana" e "divina" (o livro marca 29 magias assim). */
(function(){
  const por = new Map();
  T20_MAGIAS.forEach(m => { por.set(m.id, m); });
  T20_MAGIAS.length = 0;
  por.forEach(m => T20_MAGIAS.push(m));
  const nomes = new Set(T20_MAGIAS.map(m => m.nome));
  for(let i = T20_MAGIAS_PENDENTES.length - 1; i >= 0; i--){
    if(nomes.has(T20_MAGIAS_PENDENTES[i].nome)) T20_MAGIAS_PENDENTES.splice(i, 1);
  }
})();
