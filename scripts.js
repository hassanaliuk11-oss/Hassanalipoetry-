// scripts.js - live search, theme toggle, new portal injection and reveal animations
document.addEventListener('DOMContentLoaded',function(){
  // Theme toggle button
  const btn=document.createElement('button');btn.className='theme-toggle';btn.innerHTML='<i class="fa-solid fa-circle-half-stroke"></i> Theme';
  document.body.appendChild(btn);
  const root=document.documentElement;
  const saved=localStorage.getItem('site-theme');
  if(saved==='light')root.classList.add('light');
  btn.addEventListener('click',()=>{
    const isLight=root.classList.toggle('light');
    localStorage.setItem('site-theme',isLight?'light':'dark');
  });

  // Reveal on scroll
  const reveals=document.querySelectorAll('.reveal');
  const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('active');obs.unobserve(e.target)}}),{threshold:0.12});
  reveals.forEach(r=>obs.observe(r));

  // Live search
  window.filterContent=(value)=>{
    const q=(value||document.getElementById('liveSearch')?.value||'').toLowerCase().trim();
    const items=document.querySelectorAll('.portal-item');
    items.forEach(it=>{
      const title=(it.dataset.title||'').toLowerCase();
      const show=!q||title.includes(q);
      it.style.display=show?'block':'none';
      // simple highlight
      const heading=it.querySelector('h3');
      if(heading){const text=heading.textContent; if(q && title.includes(q)){heading.innerHTML=text.replace(new RegExp(q,'ig'),m=>`<span class="portal-highlight">${m}</span>`)} else heading.textContent=text}
    });
  };

  // Add additional job/visa links (without modifying existing ones)
  const extra=[
    {title:'EURES - European Jobs',href:'https://ec.europa.eu/eures/',img:'https://images.unsplash.com/photo-1508873699372-7ae2845a6d3d?auto=format&fit=crop&w=800&q=75',label:'EU Jobs'},
    {title:'EU Blue Card Info',href:'https://ec.europa.eu/immigration/blue-card_en',img:'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=75',label:'Work Permit'},
    {title:'Make it in Germany',href:'https://www.make-it-in-germany.com/',img:'https://images.unsplash.com/photo-1549399542-3f3b2e0a5f2b?auto=format&fit=crop&w=800&q=75',label:'Jobs & Visa'},
    {title:'UK Visas & Immigration',href:'https://www.gov.uk/browse/visas-immigration',img:'https://images.unsplash.com/photo-1520975918463-8b5c6a1b7754?auto=format&fit=crop&w=800&q=75',label:'Official UK'},
    {title:'DAAD / Study & Research',href:'https://www.daad.de/en/',img:'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=75',label:'Scholarships'},
    {title:'LinkedIn Jobs (Europe)',href:'https://www.linkedin.com/jobs/',img:'https://images.unsplash.com/photo-1520975918463-8b5c6a1b7754?auto=format&fit=crop&w=800&q=75',label:'LinkedIn'}
  ];
  const grid=document.getElementById('website-grid');
  if(grid){extra.forEach(e=>{
    const a=document.createElement('a');a.className='website-card portal-item reveal';a.href=e.href;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('data-title',e.title.toLowerCase());
    a.innerHTML=`<div class="website-art"><img class="website-thumb" src="${e.img}" alt="${e.title}" loading="lazy" decoding="async"><span class="art-label">${e.label}</span></div><div class="website-copy"><h3>${e.title}</h3><p>Official portal — opens in a new tab</p><span class="open-label">Open website ↗</span></div>`;
    grid.appendChild(a);
    // observe reveal animation for newly added
    obs.observe(a);
  })}

});
