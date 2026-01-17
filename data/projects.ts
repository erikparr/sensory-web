export interface Project {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    category: string;
    mediaContent: string | string[];
    mediaType: 'image' | 'vimeo' | 'foam3d';
    ctaLink?: string;
    ctaText?: string;
    customClass?: string;
    defaultVisible?: boolean;
}

export const projects: Project[] = [
    {
        id: 0,
        title: "Intuitive Surgical — Advanced Product Design",
        subtitle: "Roles: Design Technologist, Data Visualization, AI/ML",
        description: "<strong>Designing and engineering advanced prototypes for future surgical video and analytics tools, exploring new ways for clinicians and researchers to navigate, understand, and summarize complex procedures.</strong><br><br>Sole design engineer / design technologist embedded in an advanced product design team, responsible for building future-facing prototypes for surgical video and data tools. Developed internal case-explorer concepts that link procedure video with rich system data and event timelines, and prototyped interfaces for structured procedure insight and automated post-case review.",
        mediaContent: "/images/intuitive.png",
        mediaType: "image" as const,
        category: "Interactive, AI",
        defaultVisible: true
    },
    {
        id: 1,
        title: "FOAM — Design / Development / Product",
        subtitle: "Roles: Product Design, Full-Stack Development, Audio Engineering",
        description: "Designed and built a creative product that makes AI-generated speech playable. FOAM transforms synthesized voice into phonetic elements—enabling musicians to trigger stutters, glitch consonants, and vowel textures via MIDI or the built-in step sequencer.<br><br>Built an async processing pipeline that generates speech via text-to-speech APIs, runs forced alignment to extract frame-accurate phoneme boundaries, and delivers playable sample bundles—all orchestrated through job queues with webhook-based payments and automated error recovery. Shipped a complete product now used by producers worldwide.",
        mediaContent: "",
        mediaType: "foam3d" as const,
        ctaLink: "https://www.extrasensory.studio/foam",
        ctaText: "View Product",
        category: "AI, Interactive",
        defaultVisible: true
    },
    {
        id: 100,
        title: "Extrasensory — Digital Product Studio",
        subtitle: "Roles: Founder, Product Design, Full-Stack Development, Brand Strategy",
        description: "Founded Extrasensory, a digital product studio focused on creating professional tools for creative expression. Led the complete product development lifecycle from concept to commercial launch, establishing brand identity, technical infrastructure, and go-to-market strategy.<br><br>First product: VEX MIDI Expression, a cross-platform audio plugin that transforms MIDI controllers into expressive instruments using real-time physics simulation. Developed hybrid architecture combining JUCE C++ for DSP with React/TypeScript UI, achieving sub-10ms latency with sample-accurate MIDI timing.<br><br>Built automated CI/CD pipeline for cross-platform distribution (macOS/Windows/Linux, VST3/AU formats). Designed and launched e-commerce platform with Stripe integration and automated delivery system. Product successfully launched and actively used by music producers worldwide.",
        mediaContent: "/images/vex.png",
        mediaType: "image" as const,
        ctaLink: "https://www.extrasensory.studio",
        ctaText: "Visit Extrasensory",
        category: "Interactive, AI, Mechatronic",
        defaultVisible: false
    },
    {
        id: 2,
        title: "AudioVisual Web3D Shader Experiments",
        subtitle: "Three.js, WebGL, Shaders, Audio",
        description: "In this R&D project for Indigo Slate, spectral audio data is visualized with advanced WebGL shaders and audio-reactive 3D deformations in 3D space.",
        mediaContent: [
            "https://eaca4835oc4rgi75.public.blob.vercel-storage.com/shader001.gif",
            "https://eaca4835oc4rgi75.public.blob.vercel-storage.com/shader002.gif"
        ],
        mediaType: "image",
        category: "3D, Interactive",
        defaultVisible: false
    },
    {
        id: 3,
        title: "Adidas AR Exhibition",
        subtitle: "Exhibition Roles: Lead Developer, Exhibition Design, AR/VR",
        description: "For the permanent Adidas AR exhibition at Adidas HQ in Germany, I acted as creative technical lead for the interactive exhibition. The experience featured a number of interactive AR experiences that were triggered by physical markers.",
        mediaContent: "https://player.vimeo.com/video/345657151",
        mediaType: "vimeo",
        category: "AR/VR, Interactive, Exhibition/Museum, 3D",
        defaultVisible: true
    },
    {
        id: 4,
        title: "Exquisite Landscape",
        subtitle: "",
        description: "LandscapeClock is a generative AI art piece that creates a continuously panning 24-hour landscape panorama synchronized to real time. A Railway background worker runs daily, using LangChain + OpenAI to generate 24 chained narrative prompts—each referencing the previous for continuity—then iteratively builds a seamless panorama using Stability AI's mask-based inpainting, preserving existing content while extending the scene segment by segment. The resulting image and continuity files are uploaded to Vercel Blob storage, where a Nuxt/Vue frontend pans through the panorama based on current time, with hourly descriptions appearing via typewriter animation. Multi-day continuity is achieved by using each day's final segment as the next day's starting point.",
        mediaContent: "/images/exquisite-landscape.png",
        mediaType: "image" as const,
        ctaLink: "https://landscapeclock.vercel.app",
        ctaText: "Launch Experience",
        category: "AI, Artwork",
        defaultVisible: true
    },
    {
        id: 5,
        title: "AR Headtracking with AirPods",
        subtitle: "",
        description: "This prototype shows the potential of dynamic head tracking and AR interaction with remote content using AirPods. This opens up a range of new spatial interactions, in particular with wayfinding using spatial audio cues. The AirPods send motion data to the iPhone app which then sends data to the server. Multiple apps running on other screen can then leverage the motion data.",
        mediaContent: "https://eaca4835oc4rgi75.public.blob.vercel-storage.com/headtracking.gif",
        mediaType: "image" as const,
        category: "AR/VR, Interactive",
        defaultVisible: true
    },
    {
        id: 6,
        title: "Immersive Motion Drawer",
        subtitle: "",
        description: "This prototype uses immersive 3D particle to transform body motion into an immersive interactive experience. The technology behind the demo has two main components: 1. an interactive 3D particle environment powered by Unity3d software, and 2. a web-app which uses rotation data from a mobile device to remotely interact with the interactive 3D display. The system also utilizes a Firebase realtime database to transmit the data from the web app to the interactive display.",
        mediaContent: "https://eaca4835oc4rgi75.public.blob.vercel-storage.com/immersive-motion.gif",
        mediaType: "image" as const,
        category: "AR/VR, 3D, Interactive",
        defaultVisible: true
    },
    {
        id: 7,
        title: "Interactive 3D Web Campaign",
        subtitle: "",
        description: "Lead Software Development for a seamless 3D web experience that allowed users to experience a new product in a fun way. The experience was built using Three.js and WebGL to create a fully interactive 3D environment that could be explored in the browser.",
        mediaContent: "https://eaca4835oc4rgi75.public.blob.vercel-storage.com/suckerpunchv.gif",
        mediaType: "image" as const,
        category: "Interactive, 3D",
        defaultVisible: true
    },
    {
        id: 8,
        title: "Touchless Web Prototypes",
        subtitle: "Roles: Lead Developer, AR/VR, javascript, three.js",
        description: "In response to the covid public health crisis, Touchless is a series of prototypes created to envision ways in which touchless technology can be used in physical environments. I was the creative technology lead in the remote manipulation prototype. Here viewers can interact with exhibit artifacts from their smartphone.",
        mediaContent: "https://eaca4835oc4rgi75.public.blob.vercel-storage.com/touchless-qr.gif",
        mediaType: "image" as const,
        category: "AR/VR, Interactive, 3D",
        defaultVisible: true
    },
    {
        id: 9,
        title: "Future Studio Prototypes",
        subtitle: "",
        description: "For the creative research oriented Future Studio at Valtech, I created a number of prototypes. I created this emotion detection prototype to explore the aesthetic and technological potential of realtime facial recognition tools. The protoype captures facial movements and renders it onto a 3D avatar, and tries to infer emotional states based on data from Apple ARKit framework.",
        mediaContent: "https://eaca4835oc4rgi75.public.blob.vercel-storage.com/emotion-x.gif",
        mediaType: "image" as const,
        category: "AR/VR, Interactive, 3D",
        defaultVisible: false
    },
    {
        id: 10,
        title: "8th Wall AR Experiments",
        subtitle: "",
        description: "A prototype for 8th Wall that demonstrates an interactive AR experience that allows users to explore a 3D space with their mobile device.",
        mediaContent: "https://eaca4835oc4rgi75.public.blob.vercel-storage.com/8thWall-is-xr.gif",
        mediaType: "image" as const,
        category: "AR/VR",
        defaultVisible: true,
        customClass: "portrait-image-constrain"
    },
    {
        id: 11,
        title: "WebXR Experiments",
        subtitle: "Roles: Lead Developer, AR/VR, javascript, three.js",
        description: " Experiments with fully web-based XR using Three.js",
        mediaContent: "https://eaca4835oc4rgi75.public.blob.vercel-storage.com/waterCube.gif",
        mediaType: "image" as const,
        category: "AR/VR, 3D",
        defaultVisible: true,
        customClass: "portrait-image-constrain"
    },
    {
        id: 12,
        title: " ",
        subtitle: "",
        description: "AR 3D drawing system draws the outline of 3d objects with custom software",
        mediaContent: "https://eaca4835oc4rgi75.public.blob.vercel-storage.com/ribbonSwarm.gif",
        mediaType: "image" as const,
        category: "AR/VR, 3D",
        defaultVisible: true,
        customClass: "portrait-image-constrain"
    },
    {
        id: 13,
        title: "Immersive Art Installation — Prague National Gallery",
        subtitle: "Roles: Lead Developer, Creative Technologist, Unity3D",
        description: "Immersive environment for projection mapping and custom generative software for visual artist Egill Sæbjörnsson.",
        mediaContent: "/images/prague.png",
        mediaType: "image" as const,
        category: "Interactive, Exhibition/Museum, Artwork",
        defaultVisible: false
    },
    {
        id: 14,
        title: "Permanent Installation at Microsoft Cybercrime Center",
        subtitle: "Roles: Software Development, Creative Technology, Interactive Data Art and Exhibition Design",
        description: "At The Office for Creative Research, we created a permanent installation for the Microsoft Cybercrime enter which maps and visualizes botnets in the wild to give researchers a more intuitive way of understanding their activity over time. Using realtime datasets from millions of infected computers, we created an interactive application that allowed the data to be explored visually and sonically.",
        mediaContent: "https://eaca4835oc4rgi75.public.blob.vercel-storage.com/ocr.gif",
        mediaType: "image" as const,
        category: "Interactive, Exhibition/Museum",
        defaultVisible: true
    },
    {
        id: 15,
        title: "ScreamOmeter – Breaking glass with sound at Norwegian Science Museum",
        subtitle: "Roles: Technical Direction, Conceptual Development, Creative Technology, Interactive",
        description: "A collaboration with Gagarin for an installation where people get a chance to break a wine glass by using nothing but their own voice. As a game experience, the installation demonstrated the physics of sympathetic resonance where an audience member's voice would cause a real glass to shatter. A custom system incorporating architecture, software, physical computing brought the experience to life.",
        mediaContent: "/images/screamometer.png",
        mediaType: "image" as const,
        category: "Interactive, Exhibition/Museum, Mechatronic",
        defaultVisible: true
    },
    {
        id: 16,
        title: "Art Director and Technical Lead at Wonwei",
        subtitle: "Roles: Art Direction, Technical Direction, Software Dev, Creative Technology, Interactive Design",
        description: "Wonwei is a research-driven design & technology studio working on commissions, products and artworks. Working as Art Director and Technical Lead on a number of projects. Wonwei was commissioned by Universal Music Group to create a realtime and immersive 3D visual show for musician Ólafur Arnalds' world tour. A software system clandscapes were created to create a atmospheric narrative in response to music during the concert. Each landscape would interact to the live music and movement from the performer using a Kinect camera.",
        mediaContent: "/images/oli.png",
        mediaType: "image" as const,
        category: "Interactive, Mechatronic, Exhibition/Museum",
        defaultVisible: true
    },
    {
        id: 17,
        title: "Study For Resonators",
        subtitle: "Roles: Art Direction, Software Development, Circuit Design, Creative Technology",
        description: "Fifty resonating structures create a evolving polyrhythmic installation that transform the gallery space into a living sound sculpture. The percussive instruments create an perpetually evolving musical composition, developed using custom software and physical computing to activate the custom designed instruments. Commisioned by media art festival Raflost in Reykjavík, Iceland.",
        mediaContent: "/images/resonators.png",
        mediaType: "image" as const,
        category: "Interactive, Exhibition/Museum, Mechatronic",
        defaultVisible: true
    },
    {
        id: 18,
        title: "IOT Remote Irrigation System for Sustainable Farming",
        subtitle: "Roles: Technical direction, OT software design , Circuit Design, Creative Technology",
        description: "Using an IOT remote sensing and robotic control system, this prototype created a remote irrigation system in Portugal. The system could be monitored, controlled, and updated it realtime via an interactive web page.",
        mediaContent: "/images/iot.png",
        mediaType: "image" as const,
        category: "Interactive, Mechatronic",
        defaultVisible: false
    },
    {
        id: 19,
        title: "Microperception Window Installation",
        subtitle: "Roles: Digital laser fabrication, rapid prototyping, software development, art director",
        description: "A series of visual compositions were created for an exhibition at Third Space Gallery in Helsinki, Finland. The works explore light phenomena and forms that are barely perceptible from a distance but become clear on closer inspection. A new technique was developed where custom software creates microscopic etching patterns on a glass surface, creating a perceptual play of light, color, and reflections.",
        mediaContent: "/images/spectralMass.png",
        mediaType: "image" as const,
        category: "Exhibition/Museum, Artwork",
        defaultVisible: true
    },
    {
        id: 20,
        title: "Invisible Landscapes",
        subtitle: "Roles: Creative technologist, rapid prototyping, software development, art director",
        description: "Invisible Landscapes is an artwork that explores the potential of nano technology as an artistic medium. Focusing on the optical possibilities of light with nano structures, Nano Landscapes combines age old photographic techniques like the camera obscura to project nano-scale forms into architectural space. The result is a translation across scales, as the invisible is rendered visible yet always out of reach.",
        mediaContent: "/images/nano.png",
        mediaType: "image" as const,
        category: "Interactive, Exhibition/Museum, Artwork",
        defaultVisible: false
    },
    {
        id: 21,
        title: "One Hundred Thousand Landscapes",
        subtitle: "Roles: Software development, art direction, creative technologist",
        description: "One Hundred Thousand Landscapes is a multi-channel sound installation that creates a perpetually evolving sonic landscape from an online database of over 100,000 sound samples. The system searches for sounds that fit certain descriptions to create a sonic environment. This ruleset functions as the \"DNA\" of the piece, providing an organizing principal to the evolution of the sonic environment. In addition, the system also informs its own progression as each new sound influences the next using spectral descriptors of the sound file to search for other sound files that sound similar.",
        mediaContent: "/images/100000Landscapes.png",
        mediaType: "image" as const,
        category: "Interactive, Exhibition/Museum, Artwork",
        defaultVisible: false
    },
    {
        id: 22,
        title: "Research in computational print techniques",
        subtitle: "Roles: Software development, artistic research, creative technology",
        description: "Research and development into custom software systems for generating robust vector and print graphics in C++ / openframeworks. The aim of this research was to develop methods for integrating cinema and photography into a generative print graphics workflow. The project resulted in custom software that provided scalable vector graphics that could be rendered to print or even animation film. This line of research also opens the door for instant creation of unique printed material based on customizable user input.",
        mediaContent: "/images/vectorPrints.png",
        mediaType: "image" as const,
        category: "Interactive, Exhibition/Museum, Artwork",
        defaultVisible: false
    },
    {
        id: 23,
        title: "Technical Production and Fabrication Commission",
        subtitle: "Roles: Software development, hardware development, physical computing",
        description: "I was commissioned by gallery artist Egill Saebjornsson to design, develop, and build a series of artworks. The installations create a generative environment of interacting projection mapped animations and mechatronic sound sculptures. The works have been exhibited internationally and at international art fairs.",
        mediaContent: "/images/clinamen.png",
        mediaType: "image" as const,
        category: "Interactive, Exhibition/Museum, Artwork",
        defaultVisible: false
    },
    {
        id: 24,
        title: "Interactive Mechatronic Sound Sculpture Artwork",
        subtitle: "Roles: Technical director, software development, hardware development, circuit design and fabrication, R&D",
        description: "As technical director, I was responsible for the overall technical direction of the project. A 3D projection mapped animations trigger the physical instruments powered by custom circuitry using Arduino. The project was developed in collaboration with the artist.",
        mediaContent: "/images/egill.png",
        mediaType: "image" as const,
        category: "Mechatronic, Exhibition/Museum, Artwork",
        defaultVisible: false
    },

    {
        id: 25,
        title: " ",
        subtitle: "",
        description: "AR 3D drawing system draws the outline of 3d objects with custom software",
        mediaContent: "https://eaca4835oc4rgi75.public.blob.vercel-storage.com/cubesWave.gif",
        mediaType: "image" as const,
        category: "AR/VR, 3D",
        defaultVisible: false
    },];

// Optional: Export categories separately if you want to maintain a specific order
export const categories = [
    'All',
    'AI',
    'AR/VR',
    '3D',
    'Interactive',
    'Exhibition/Museum',
    'Artwork',
    'Mechatronic'
];