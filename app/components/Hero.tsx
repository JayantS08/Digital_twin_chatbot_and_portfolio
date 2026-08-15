import {ArrowDown,MessageCircle} from "lucide-react";
export default function Hero(){return <section className="hero"><div className="container">
<div className="kicker">AI / Algorithms / Computer Systems</div><h1>Jayant<br/><em>Singh.</em></h1>
<p className="hero-copy">I build intelligent systems, algorithms and infrastructure at the intersection of artificial intelligence, machine learning and computer systems.</p>
<div className="actions"><a className="btn" href="#work">Explore my work <ArrowDown size={15}/></a><a className="btn secondary" href="#twin">Talk to my AI <MessageCircle size={15}/></a></div>
</div></section>}