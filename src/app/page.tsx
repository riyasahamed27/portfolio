'use client';

import React, { useState, useEffect } from 'react';
import { 
  Github, Linkedin, Mail, Twitter, 
  Download, ExternalLink, Code2, Terminal, 
  Database, Cpu, Globe, Layout, Server, 
  ChevronRight, Moon, Sun 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Playfair_Display, Inter } from 'next/font/google';

// --- IMPORTS ---
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, 
  SiNodedotjs, SiExpress, SiPhp, SiLaravel, 
  SiPostgresql, SiMongodb, SiAmazon, SiDocker, 
  SiPython, SiTensorflow, SiOpencv, SiMysql, SiGit 
} from 'react-icons/si';

// --- FONTS SETUP ---
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function Portfolio() {
  // --- THEME STATE ---
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Theme Function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Apply Theme to HTML Tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`${playfair.variable} ${inter.variable} min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 overflow-x-hidden transition-colors duration-300`}>
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="text-2xl font-bold font-serif text-blue-700 dark:text-blue-400 tracking-tight"
          >
            RA.
          </motion.div>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600 dark:text-slate-400">
              {['Home', 'Skills', 'Projects', 'Experience', 'About'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* THEME TOGGLE BUTTON */}
            <button 
                onClick={toggleTheme} 
                className="p-2 cursor-pointer rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-110 transition-all duration-300 border border-slate-200 dark:border-slate-700"
                aria-label="Toggle Dark Mode"
            >
                {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="pt-28 pb-12 px-6 max-w-7xl mx-auto min-h-screen flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
        
        {/* Left: Text Content */}
        <div className="flex-1 space-y-6">
            <FadeIn delay={0.1}>
                <div className="space-y-2">
                    <h2 className="text-4xl md:text-6xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
                        Hi, I'm Riyas <br />
                        <span className="text-blue-700 dark:text-blue-400">Ahamed</span>
                    </h2>
                    <h3 className="text-xl md:text-2xl text-blue-600 dark:text-blue-300 font-medium">
                        Full Stack Software Developer
                    </h3>
                </div>
            </FadeIn>

            <FadeIn delay={0.2}>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                    I build scalable, full-stack applications with <strong>React, Next.js, and Node.js</strong> that deliver exceptional user experiences. 
                    With 2+ years of experience, I focus on clean code and performance.
                </p>
            </FadeIn>

            <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-4 pt-2">
                    <a 
                        href="#projects"
                        className="px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-full shadow-lg shadow-blue-600/20 hover:bg-blue-700 dark:hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        View my work →
                    </a>
                    <a 
                        href="/resume.pdf" 
                        target="_blank"
                        className="px-8 py-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium rounded-full hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center gap-2"
                    >
                        Download Resume <Download size={18} />
                    </a>
                </div>
            </FadeIn>

            <FadeIn delay={0.4}>
                <div className="pt-4 flex gap-4">
                    <SocialIcon href="https://github.com/rivasahamed27" icon={<Github size={20}/>} />
                    <SocialIcon href="https://linkedin.com/in/riyas-ahamed-963a96281" icon={<Linkedin size={20}/>} />
                    <SocialIcon href="mailto:riyasahamed82478@gmail.com" icon={<Mail size={20}/>} />
                </div>
            </FadeIn>
        </div>

        {/* Right: Floating Code Editor */}
        <div className="flex-1 w-full max-w-md relative">
            <FadeIn delay={0.2} direction="right">
                <div className="relative">
                    <motion.div 
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-xl"
                    ></motion.div>
                    
                    <motion.div 
                      animate={{ 
                          y: [0, -15, 0],           
                          rotate: [0, 1.5, 0],      
                      }}
                      transition={{ 
                          duration: 8,              
                          repeat: Infinity, 
                          ease: [0.45, 0, 0.55, 1]  
                      }}
                      className="relative bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-800"
                    >
                        <div className="bg-slate-800/50 px-4 py-3 flex items-center gap-2 border-b border-slate-700/50">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            <div className="ml-4 text-xs text-slate-400 font-mono">Developer.tsx</div>
                        </div>

                        <div className="p-6 overflow-x-auto">
                            <pre className="font-mono text-sm leading-relaxed text-slate-300">
                                <code>
                                    <span className="text-purple-400">const</span> <span className="text-yellow-200">Riyas</span> <span className="text-purple-400">=</span> <span className="text-blue-400">{"{"}</span>{'\n'}
                                    {'  '}<span className="text-sky-300">role:</span> <span className="text-green-400">"Full Stack Dev"</span>,{'\n'}
                                    {'  '}<span className="text-sky-300">experience:</span> <span className="text-green-400">"2+ years"</span>,{'\n'}
                                    {'  '}<span className="text-sky-300">skills:</span> <span className="text-blue-400">[</span>{'\n'}
                                    {'    '}<span className="text-green-400">"React"</span>, <span className="text-green-400">"Next.js"</span>,{'\n'}
                                    {'    '}<span className="text-green-400">"Node"</span>, <span className="text-green-400">"SQL"</span>{'\n'}
                                    {'  '}<span className="text-blue-400">]</span>{'\n'}
                                    <span className="text-blue-400">{"}"}</span>;
                                </code>
                            </pre>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3"
                    >
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400">
                            <Code2 size={20} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Status</div>
                            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">Open to Work</div>
                        </div>
                    </motion.div>
                </div>
            </FadeIn>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="py-16 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          
          <FadeIn>
            <h2 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">Skills & Technologies</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-12">
              The professional stack I use to build scalable, production-ready applications.
            </p>
          </FadeIn>
          
          <div className="mb-12">
            <FadeIn delay={0.1}>
              <h3 className="text-2xl font-serif font-bold text-blue-900 dark:text-blue-300 mb-8">Full Stack Engineering</h3>
            </FadeIn>
            
            <div className="flex flex-wrap justify-center gap-6">
               <SkillIcon name="React" icon={<SiReact />} color="text-[#61DAFB]" delay={0.1} />
               <SkillIcon name="Next.js" icon={<SiNextdotjs />} color="text-black dark:text-white" delay={0.15} />
               <SkillIcon name="TypeScript" icon={<SiTypescript />} color="text-[#3178C6]" delay={0.2} />
               <SkillIcon name="Tailwind CSS" icon={<SiTailwindcss />} color="text-[#06B6D4]" delay={0.25} />
               <SkillIcon name="JavaScript" icon={<SiJavascript />} color="text-[#F7DF1E]" delay={0.3} />
               
               <SkillIcon name="Node.js" icon={<SiNodedotjs />} color="text-[#339933]" delay={0.35} />
               <SkillIcon name="Express.js" icon={<SiExpress />} color="text-black dark:text-white" delay={0.4} />
               <SkillIcon name="PHP" icon={<SiPhp />} color="text-[#777BB4]" delay={0.45} />
               <SkillIcon name="Laravel" icon={<SiLaravel />} color="text-[#FF2D20]" delay={0.5} />
               
               <SkillIcon name="PostgreSQL" icon={<SiPostgresql />} color="text-[#4169E1]" delay={0.6} />
               <SkillIcon name="MySQL" icon={<SiMysql />} color="text-[#4479A1]" delay={0.65} />
               <SkillIcon name="MongoDB" icon={<SiMongodb />} color="text-[#47A248]" delay={0.7} />
               <SkillIcon name="AWS" icon={<SiAmazon />} color="text-[#FF9900]" delay={0.75} />
               <SkillIcon name="Docker" icon={<SiDocker />} color="text-[#2496ED]" delay={0.8} />
            </div>
          </div>

          <div>
            <FadeIn delay={0.6}>
              <h3 className="text-2xl font-serif font-bold text-purple-900 dark:text-purple-300 mb-8">AI & Machine Learning</h3>
            </FadeIn>
            
            <div className="flex flex-wrap justify-center gap-6">
               <SkillIcon name="Python" icon={<SiPython />} color="text-[#3776AB]" delay={0.8} />
               <SkillIcon name="TensorFlow" icon={<SiTensorflow />} color="text-[#FF6F00]" delay={0.85} />
               <SkillIcon name="OpenCV" icon={<SiOpencv />} color="text-[#5C3EE8]" delay={0.9} />
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
            <SectionHeader title="Featured Projects" subtitle="Highlighted work showcasing technical expertise" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard 
                    title="AI Fashion Platform"
                    desc="Architected a full-stack web app generating personalized outfit suggestions using AI-based image analysis and machine learning algorithms."
                    tags={['React', 'Node.js', 'Python', 'AI/ML']}
                    image="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    delay={0}
                />
                <ProjectCard 
                    title="Ribatis Mobile"
                    desc="Secure government communication app with end-to-end encrypted chat and audio/video conferencing using Matrix SDK."
                    tags={['React Native', 'WebRTC', 'Matrix SDK']}
                    image="https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    delay={0.2}
                />
                <ProjectCard 
                    title="Energy Dashboard"
                    desc="Interactive dashboard for real-time visualization of electricity consumption across Dubai buildings with dynamic reporting."
                    tags={['Next.js', 'Django', 'Chart.js']}
                    image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    delay={0.4}
                />
                 <ProjectCard 
                    title="Swypatune"
                    desc="Full-stack contest platform for video/audio content featuring monetization, push notifications, and payment processing."
                    tags={['Laravel', 'Ionic', 'Stripe']}
                    image="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    delay={0.6}
                />
            </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section id="experience" className="py-16 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader title="Experience" subtitle="My professional journey and key achievements" />
          
          <div className="relative mt-8 space-y-8">
            <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-4 top-0 w-0.5 bg-blue-100 dark:bg-blue-900"
            ></motion.div>

            <ExperienceCard 
                role="Junior Software Developer"
                company="RedBlox.io"
                date="Feb 2024 - Present"
                items={[
                    "Developed and deployed 6+ full-stack web applications serving 10,000+ active users.",
                    "Architected secure user authentication systems (RBAC) using JWT and OAuth 2.0 protocols.",
                    "Optimized frontend performance, achieving a 20% improvement in page load times."
                ]}
                tech={['React', 'Next.js', 'Node.js', 'MySQL']}
                delay={0.1}
            />

            <ExperienceCard 
                role="Software Development Intern"
                company="RedBlox.io"
                date="2020 - 2023"
                items={[
                    "Developed web modules using React.js, Express.js, and MySQL.",
                    "Implemented backend APIs and user authentication flows.",
                    "Strong performance led to a full-time offer."
                ]}
                tech={['React', 'Express', 'API Design']}
                delay={0.3}
            />
             <ExperienceCard 
                role="Full Stack Intern"
                company="Twilight IT Solution"
                date="Internship"
                items={[
                    "Gained hands-on experience in full-stack development.",
                    "Worked with HTML, CSS, JavaScript, PHP, MySQL, React.js, and MongoDB."
                ]}
                tech={['PHP', 'MySQL', 'React']}
                delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* --- ABOUT / FOOTER --- */}
      <section id="about" className="py-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-3xl mx-auto px-6 text-center">
            <FadeIn>
                <h2 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-6 relative inline-block">
                    About Me
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                </h2>
            </FadeIn>
            
            <div className="grid md:grid-cols-2 gap-8 text-left mt-8">
                <FadeIn delay={0.2} direction="left">
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Background</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            I'm a passionate developer who started coding out of curiosity and turned it into a career. 
                            I love building things that work fast, look clean, and solve real problems.
                        </p>
                    </div>
                </FadeIn>
                <FadeIn delay={0.2} direction="right">
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Beyond Coding</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            When I'm not shipping code, I'm exploring new AI tools, contributing to open source, 
                            or optimizing my workflow. Curiosity keeps me alive.
                        </p>
                    </div>
                </FadeIn>
            </div>
            
            <FadeIn delay={0.4}>
                <p className="mt-12 text-xl font-serif text-blue-600 dark:text-blue-300 italic">
                    "I architect secure, scalable solutions that improve performance and serve thousands of users reliably."
                </p>
            </FadeIn>

            <FadeIn delay={0.6}>
                <div className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center">
                    <p className="text-slate-500 dark:text-slate-500 text-sm mb-4">Designed & Built by Riyas Ahamed</p>
                    <div className="flex gap-4">
                        <SocialIcon href="https://github.com/rivasahamed27" icon={<Github size={18} />} />
                        <SocialIcon href="https://linkedin.com/in/riyas-ahamed-963a96281" icon={<Linkedin size={18} />} />
                    </div>
                </div>
            </FadeIn>
        </div>
      </section>
    </div>
  );
}

// --- SUB COMPONENTS (Dark Mode Enhanced) ---

function FadeIn({ 
    children, 
    delay = 0, 
    direction = "up", 
    className 
}: { 
    children: React.ReactNode, 
    delay?: number, 
    direction?: "up" | "down" | "left" | "right", 
    className?: string 
}) {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 }
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay, type: "spring", stiffness: 50 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

function SectionHeader({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="text-center mb-10 space-y-2">
            <FadeIn>
                <h2 className="text-4xl font-serif font-bold text-slate-900 dark:text-white">{title}</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">{subtitle}</p>
            </FadeIn>
        </div>
    )
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-900 dark:hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function SkillIcon({ name, icon, color, delay }: { name: string; icon: React.ReactNode; color: string, delay: number }) {
  return (
    <FadeIn delay={delay}>
        <motion.div 
            whileHover={{ y: -8 }}
            className="group relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28 bg-white dark:bg-slate-800 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] dark:shadow-none dark:border-slate-700 transition-all cursor-default border border-slate-50 dark:border-slate-700"
        >
            <div className={`transform transition-transform duration-300 group-hover:scale-110 ${color} text-4xl md:text-5xl`}>
                {icon}
            </div>
            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold py-1.5 px-3 rounded-lg whitespace-nowrap shadow-lg pointer-events-none z-20">
                {name}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45"></div>
            </div>
        </motion.div>
    </FadeIn>
  );
}

function ProjectCard({ title, desc, tags, image, delay }: { title: string; desc: string; tags: string[]; image: string, delay: number }) {
  return (
    <FadeIn delay={delay}>
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col h-full group"
        >
            <div className="h-48 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1000&q=80";
                    }}
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                    {desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    </FadeIn>
  );
}

function ExperienceCard({ role, company, date, items, tech, delay }: { role: string; company: string; date: string; items: string[]; tech: string[], delay: number }) {
    return (
        <FadeIn delay={delay} direction="left">
            <div className="relative pl-12 group">
                <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    className="absolute left-[9px] top-6 w-3.5 h-3.5 bg-white dark:bg-slate-900 border-4 border-blue-600 dark:border-blue-500 rounded-full z-10"
                ></motion.div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md dark:shadow-none transition-shadow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{role}</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">{company}</p>
                        </div>
                        <span className="px-4 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-medium rounded-full w-fit">
                            {date}
                        </span>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                        {items.map((item, i) => (
                            <li key={i} className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex gap-2">
                                <span className="text-blue-400 mt-1.5">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                        {tech.map(t => (
                            <span key={t} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-md">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}