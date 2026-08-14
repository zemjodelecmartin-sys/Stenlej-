const slides = {
en: [
['OUR STORY','Stenlej','A fruit-growing company from Pehčevo, North Macedonia, specialized in Stanley plums.',['60 ha of orchards','30,000+ plum trees'],'stenlej_01.jpg'],
['OUR ORCHARDS','Growing with purpose','Established productive orchards and young plantations create a strong base for increasing production in the years ahead.',['Stanley plum','Growing capacity'],'stenlej_06.jpg'],
['THE FRUIT','Stanley plum','Carefully grown fruit from the clean mountain region of eastern North Macedonia.',['Fresh market focus','Consistent quality'],'stenlej_04.jpg'],
['TRACEABILITY','Organized production','Our production is organized by individual orchard blocks, supporting control and traceability from orchard to product.',['Orchard blocks','Traceable production'],'stenlej_05.jpg'],
['MODERN PRODUCTION','Efficient harvest','Modern orchard management and mechanized harvesting help us efficiently manage increasing volumes.',['Mechanized harvest','Efficient operations'],'stenlej_02.jpg'],
['HARVEST','From tree to crate','The harvest is organized to move fruit efficiently from the orchard toward selection, packing and the market.',['Careful handling','Seasonal capacity'],'stenlej_03.jpg'],
['EXPANSION','Investing for the future','As our orchards grow, Stenlej is developing new infrastructure for fruit reception, selection, packing and cold storage.',['Packing — in development','Cold storage — in development'],'stenlej_07.jpg'],
['PARTNERSHIP','Built for long-term cooperation','We look beyond a single season. Our goal is reliable, long-term cooperation with buyers and partners across Europe.',['Reliable supply','Long-term partnership'],'stenlej_08.jpg'],
['WE GROW TOGETHER','Stenlej','From our orchards to your market — together for the future.',['Pehčevo • North Macedonia','European market'],'stenlej_09.jpg']
],
mk: [
['НАШАТА ПРИКАЗНА','Стенлеј','Овоштарска компанија од Пехчево, Северна Македонија, специјализирана за производство на слива од сортата Стенлеј.',['60 ha насади','30.000+ сливови дрвја'],'stenlej_01.jpg'],
['НАШИТЕ НАСАДИ','Растеме со јасна цел','Родните насади и младите овоштарници создаваат силна основа за раст на производството во следните години.',['Слива Стенлеј','Растечки капацитет'],'stenlej_06.jpg'],
['ПЛОДОТ','Слива Стенлеј','Внимателно одгледувана слива од чистиот планински регион на источна Северна Македонија.',['За свеж пазар','Постојан квалитет'],'stenlej_04.jpg'],
['СЛЕДЛИВОСТ','Организирано производство','Производството е организирано по одделни производни блокови, со контрола и следливост од насадот до производот.',['Производни блокови','Следливо производство'],'stenlej_05.jpg'],
['МОДЕРНО ПРОИЗВОДСТВО','Ефикасна берба','Современото управување со насадите и механизираната берба ни овозможуваат ефикасно справување со растечките количини.',['Механизирана берба','Ефикасна работа'],'stenlej_02.jpg'],
['БЕРБА','Од дрво до гајба','Бербата е организирана за плодот ефикасно да се движи од насадот кон селекција, пакување и пазарот.',['Внимателно ракување','Сезонски капацитет'],'stenlej_03.jpg'],
['РАЗВОЈ','Инвестираме во иднината','Со растот на насадите, Стенлеј развива нова инфраструктура за прием, селекција, пакување и ладно чување на овошјето.',['Пакување — во развој','Ладно чување — во развој'],'stenlej_07.jpg'],
['ПАРТНЕРСТВО','За долгорочна соработка','Не размислуваме само за една сезона. Нашата цел е сигурна, долгорочна соработка со купувачи и партнери ширум Европа.',['Сигурно снабдување','Долгорочно партнерство'],'stenlej_08.jpg'],
['РАСТЕМЕ ЗАЕДНО','Стенлеј','Од нашите насади до вашиот пазар — заедно за иднината.',['Пехчево • Северна Македонија','Европски пазар'],'stenlej_09.jpg']
]};

let lang='en', i=0, timer=null, paused=false, duration=6500;

function startPresentation(l){
  lang=l;
  document.getElementById('welcome').classList.add('hidden');
  document.getElementById('show').classList.remove('hidden');
  i=0; paused=false;
  document.getElementById('sound').textContent='❚❚';
  render();
}
function render(){
  clearTimeout(timer);
  const s=slides[lang][i], bg=document.getElementById('bg');
  bg.style.opacity=.15;
  setTimeout(()=>{bg.style.backgroundImage=`url("${s[4]}")`;bg.style.opacity=1;bg.style.transform='scale(1.10)'},120);
  document.getElementById('kicker').textContent=s[0];
  document.getElementById('title').textContent=s[1];
  document.getElementById('text').textContent=s[2];
  document.getElementById('stats').innerHTML=s[3].map(x=>`<span>${x}</span>`).join('');
  document.getElementById('counter').textContent=`${i+1}/${slides[lang].length}`;
  const bar=document.getElementById('bar');
  bar.style.transition='none'; bar.style.width='0';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    bar.style.transition=`width ${duration}ms linear`; bar.style.width='100%';
  }));
  if(!paused) timer=setTimeout(next,duration);
}
function next(){i=(i+1)%slides[lang].length;render()}
function togglePause(){
  paused=!paused;
  document.getElementById('sound').textContent=paused?'▶':'❚❚';
  if(paused){clearTimeout(timer);document.getElementById('bar').style.transition='none'} else render();
}
function restart(){
  clearTimeout(timer);
  document.getElementById('show').classList.add('hidden');
  document.getElementById('welcome').classList.remove('hidden');
  paused=false;
}
document.getElementById('btn-en').addEventListener('click',()=>startPresentation('en'));
document.getElementById('btn-mk').addEventListener('click',()=>startPresentation('mk'));
document.getElementById('sound').addEventListener('click',togglePause);
document.getElementById('restart').addEventListener('click',restart);
document.addEventListener('click',e=>{
  if(!document.getElementById('show').classList.contains('hidden') &&
     !e.target.closest('button') && e.clientX>innerWidth*.7) next();
});
