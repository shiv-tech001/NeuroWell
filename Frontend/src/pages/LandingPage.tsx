import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Users,
  Bot,
  Book,
  Music,
  LineChart,
  AlertTriangle,
  Star,
  Sparkles,
  Heart,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Globe,
  Rocket,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % reviews.length);
    }, 4000);
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      clearInterval(interval);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const features = [
    {
      icon: <Users className="w-12 h-12" />,
      title: "Student-Counselor Connection",
      desc: "Connect with certified counselors for personalized support and guidance.",
      gradient: "from-purple-500 via-pink-500 to-red-500",
      delay: 0.1,
    },
    {
      icon: <Bot className="w-12 h-12" />,
      title: "AI Chatbot",
      desc: "Get immediate 24/7 assistance from our intelligent AI companion.",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      delay: 0.2,
    },
    {
      icon: <Book className="w-12 h-12" />,
      title: "Motivational Resources",
      desc: "Access curated library of books, articles, and wellness content.",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      delay: 0.3,
    },
    {
      icon: <Music className="w-12 h-12" />,
      title: "Relaxing Music Therapy",
      desc: "Discover healing soundscapes and therapeutic music playlists.",
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      delay: 0.4,
    },
    {
      icon: <LineChart className="w-12 h-12" />,
      title: "Mood Tracking & Analytics",
      desc: "Track emotional patterns with advanced analytics and insights.",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      delay: 0.5,
    },
    {
      icon: <AlertTriangle className="w-12 h-12" />,
      title: "Emergency SOS System",
      desc: "Instant crisis support with one-tap emergency assistance.",
      gradient: "from-red-500 via-pink-500 to-rose-500",
      delay: 0.6,
    },
  ];

  const reviews = [
    {
      name: "Ananya Sharma",
      review: "This platform completely transformed my mental health journey. The AI chatbot feels like talking to a caring friend who's always there.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      role: "Computer Science Student",
      university: "IIT Delhi",
    },
    {
      name: "Rahul Verma",
      review: "The counselor connection feature saved my academic career. Professional support when I needed it most, available 24/7.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      role: "Engineering Student",
      university: "NIT Trichy",
    },
    {
      name: "Priya Singh",
      review: "Mood tracking helped me understand my patterns. The insights are incredible and the music therapy is so soothing.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/52.jpg",
      role: "Medical Student",
      university: "AIIMS New Delhi",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
<div className="w-full font-sans overflow-x-hidden relative isolate">      {/* Global Styles for Smooth Scrolling */}
      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 5rem; 
        }
        
        * {
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #4f46e5, #7c3aed);
        }
      `}</style>

      {/* Animated Background Elements - Fixed z-index */}
      <div className="fixed inset-0 -z-20">
        <motion.div
          style={{ y, opacity }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [-50, 50, -50],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero Section - Added proper padding for navbar */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 -z-10" />
        
        {/* Floating Elements - Fixed z-index */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-32 left-20 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 -z-10"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-52 right-32 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-30 rotate-45 -z-10"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-44 left-40 w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-25 -z-10"
        />

        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-purple-200 px-6 py-3 rounded-full"
              >
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span className="text-purple-700 font-semibold">AI-Powered Mental Health Platform</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight"
              >
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Empowering
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                  Students,
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
                  Connecting
                </span>
                <br />
                <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  Counselors
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-gray-700 leading-relaxed max-w-lg"
              >
                Transform your mental health journey with our revolutionary platform. 
                Connect with certified counselors, leverage AI support, and access 
                personalized wellness resources in a safe, nurturing environment.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-3">
                    <Rocket className="w-6 h-6" />
                    <Link to="/login">Start Your Journey</Link>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>

              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-wrap items-center gap-6 text-sm text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>24/7 Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>AI-Powered</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-red-500/30 rounded-3xl blur-2xl" />
                  <motion.img
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    src="/LandingPage.jpg"
                    alt="Student Mental Health Support"
                    className="relative w-full max-w-2xl drop-shadow-2xl rounded-3xl"
                  />                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-xs opacity-90">Support</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.7, type: "spring", stiffness: 200 }}
                  className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-2xl shadow-2xl"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">AI</div>
                    <div className="text-xs opacity-90">Powered</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenge Section - Added scroll-margin for smooth navigation */}
      <section id="challenge" className="py-20 md:py-32 px-6 md:px-20 relative scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/30 to-pink-50/30 -z-10" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent"
            >
              The Crisis & Our Innovation
            </motion.h2>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
            >
              Student mental health is in crisis. With{" "}
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="font-bold text-transparent bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text cursor-pointer"
              >
                75%
              </motion.span>{" "}
              reporting significant stress, we're revolutionizing mental wellness with AI-powered, comprehensive support.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Users className="w-16 h-16" />,
                title: "Certified Counselors",
                desc: "Connect with licensed professionals for personalized, confidential support tailored to your needs.",
                gradient: "from-blue-500 via-indigo-500 to-purple-500",
                shadowColor: "shadow-blue-500/25",
              },
              {
                icon: <Bot className="w-16 h-16" />,
                title: "AI Mental Health Companion",
                desc: "24/7 intelligent support with empathetic responses and evidence-based therapeutic techniques.",
                gradient: "from-purple-500 via-pink-500 to-red-500",
                shadowColor: "shadow-purple-500/25",
              },
              {
                icon: <LineChart className="w-16 h-16" />,
                title: "Advanced Mood Analytics",
                desc: "Track emotional patterns with ML insights, predictive analytics, and personalized recommendations.",
                gradient: "from-green-500 via-emerald-500 to-teal-500",
                shadowColor: "shadow-green-500/25",
              },
              {
                icon: <AlertTriangle className="w-16 h-16" />,
                title: "Crisis Intervention",
                desc: "Immediate emergency response system with instant professional intervention capabilities.",
                gradient: "from-red-500 via-orange-500 to-yellow-500",
                shadowColor: "shadow-red-500/25",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className={`group relative p-8 md:p-10 rounded-3xl bg-white/80 backdrop-blur-lg border border-white/50 ${item.shadowColor} shadow-2xl hover:shadow-4xl transition-all duration-500 overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`} />
                <div className="relative z-10">
                  <div className={`text-transparent bg-gradient-to-r ${item.gradient} bg-clip-text mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-gray-900 group-hover:text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 px-6 md:px-20 relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 -z-10">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Revolutionary Features
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Cutting-edge technology meets compassionate care in our comprehensive mental health ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                whileHover={{ 
                  y: -20, 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
              >
                <div className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`} />
                  
                  <div className="relative z-10">
                    <div className={`text-transparent bg-gradient-to-r ${feature.gradient} bg-clip-text mb-6 transform group-hover:scale-110 transition-all duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-4 text-white group-hover:text-blue-100">
                      {feature.title}
                    </h3>
                    <p className="text-blue-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {feature.desc}
                    </p>
                  </div>

                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 md:py-32 px-6 md:px-20 relative scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 -z-10" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              Simple. Powerful. Effective.
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Your journey to better mental health starts with three simple steps.
            </p>
          </motion.div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  num: "01",
                  title: "Sign Up Instantly",
                  desc: "Create your secure, confidential account in under 60 seconds with bank-level encryption.",
                  gradient: "from-blue-500 to-cyan-500",
                  icon: <Globe className="w-8 h-8" />,
                },
                {
                  num: "02",
                  title: "Personalized Dashboard",
                  desc: "Access your AI-curated dashboard with personalized insights, resources, and connection options.",
                  gradient: "from-purple-500 to-pink-500",
                  icon: <Zap className="w-8 h-8" />,
                },
                {
                  num: "03",
                  title: "Connect & Heal",
                  desc: "Engage with counselors, track progress, and access emergency support whenever needed.",
                  gradient: "from-green-500 to-emerald-500",
                  icon: <Heart className="w-8 h-8" />,
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative group"
                >
                  <div className="relative p-10 rounded-3xl bg-white shadow-2xl hover:shadow-4xl transition-all duration-500 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.gradient} text-white flex items-center justify-center font-black text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {step.num}
                        </div>
                        <div className={`text-transparent bg-gradient-to-r ${step.gradient} bg-clip-text group-hover:scale-110 transition-transform duration-300`}>
                          {step.icon}
                        </div>
                      </div>
                      
                      <h4 className="font-bold text-2xl mb-4 text-gray-900 group-hover:text-gray-800">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700">
                        {step.desc}
                      </p>
                    </div>

                    {i < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 transform -translate-y-1/2">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${step.gradient} w-0`}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1, delay: (i + 1) * 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 md:py-32 px-6 md:px-20 relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 -z-10">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Transforming Lives Daily
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Real impact, real change, real support for students worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "1000+", label: "Students Supported", icon: <Users className="w-8 h-8" />, gradient: "from-blue-400 to-cyan-400" },
              { number: "100+", label: "Certified Counselors", icon: <Shield className="w-8 h-8" />, gradient: "from-purple-400 to-pink-400" },
              { number: "24/7", label: "AI Support Available", icon: <Bot className="w-8 h-8" />, gradient: "from-green-400 to-emerald-400" },
              { number: "95%", label: "Satisfaction Rate", icon: <Star className="w-8 h-8" />, gradient: "from-yellow-400 to-orange-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3 } }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative group"
              >
                <div className="p-10 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-500 text-center overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`} />
                  
                  <div className="relative z-10">
                    <div className={`text-transparent bg-gradient-to-r ${stat.gradient} bg-clip-text mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-blue-100">
                      {stat.number}
                    </h3>
                    <p className="text-blue-100 text-lg group-hover:text-white transition-colors duration-300">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section id="testimonials" className="py-20 md:py-32 px-6 md:px-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 scroll-mt-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
              Student Success Stories
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Hear from students whose lives have been transformed through our platform.
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                className="relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative p-10 rounded-3xl bg-white shadow-2xl border border-purple-100"
                    >
                      <div className="absolute -top-4 -left-4 text-6xl text-purple-300 font-serif">"</div>
                      <div className="relative z-10">
                        <div className="flex mb-4">
                          {[...Array(reviews[currentTestimonial].rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                            >
                              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-xl text-gray-700 leading-relaxed mb-6 italic">
                          {reviews[currentTestimonial].review}
                        </p>
                        <div className="flex items-center gap-4">
                          <motion.img
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            src={reviews[currentTestimonial].avatar}
                            alt={reviews[currentTestimonial].name}
                            className="w-16 h-16 rounded-full border-4 border-purple-200 shadow-lg"
                          />
                          <div>
                            <h4 className="font-bold text-xl text-gray-900">
                              {reviews[currentTestimonial].name}
                            </h4>
                            <p className="text-purple-600 font-semibold">
                              {reviews[currentTestimonial].role}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {reviews[currentTestimonial].university}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="relative"
                    >
                      <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-rose-500/30 rounded-3xl blur-2xl" />
                      <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="Happy students"
                        className="relative w-full rounded-3xl shadow-2xl"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-12 gap-3">
              {reviews.map((_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    i === currentTestimonial
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-125"
                      : "bg-gray-300 hover:bg-purple-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 md:py-32 px-6 md:px-20 relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 -z-10">
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight"
            >
              Ready to Transform Your
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Mental Health Journey?
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed"
            >
              Join thousands of students who have already started their path to better mental health.
              Your journey begins with a single click.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-white text-indigo-600 px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:shadow-4xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <Rocket className="w-7 h-7" />
                  <Link to="/login">Start Free Today</Link>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center gap-4 text-blue-100"
              >
                <CheckCircle className="w-6 h-6 text-green-300" />
                <span className="text-lg">No credit card required</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}