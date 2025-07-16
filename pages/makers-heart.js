import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerChildren } from '@/utils/animations';
import { AVATAR_MODES } from '@/utils/constants';
import { usePassport } from '@/context/PassportContext';
import { FiZoomIn, FiX } from 'react-icons/fi';

const GalleryItem = ({ image, title, description, story, onClick }) => (
  <motion.div
    variants={fadeInUp}
    className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
    onClick={onClick}
    whileHover={{ y: -5 }}
  >
    <div className="aspect-w-4 aspect-h-3 bg-gray-100">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-sans font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-white/80">{description}</p>
      </div>
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
        <FiZoomIn className="text-white" size={20} />
      </div>
    </div>
  </motion.div>
);

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 z-10 hover:bg-white transition-colors duration-300"
            aria-label="Close modal"
          >
            <FiX size={24} className="text-brand-navy" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-w-4 aspect-h-3 md:aspect-h-4 bg-gray-100">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8">
              <h2 className="font-sans font-bold text-3xl text-brand-navy mb-4">
                {project.title}
              </h2>
              <p className="text-gray-600 mb-6">{project.description}</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">
                    The Story
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{project.story}</p>
                </div>
                
                {project.materials && (
                  <div>
                    <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">
                      Materials & Technique
                    </h3>
                    <p className="text-gray-700">{project.materials}</p>
                  </div>
                )}
                
                {project.lesson && (
                  <div className="bg-brand-walnut/10 rounded-lg p-4">
                    <h3 className="font-sans font-bold text-lg text-brand-walnut mb-2">
                      Life Lesson
                    </h3>
                    <p className="text-gray-700 italic">"{project.lesson}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MakersHeartPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const { addAchievement, ACHIEVEMENTS } = usePassport();

  useEffect(() => {
    addAchievement(ACHIEVEMENTS.CRAFT_ADMIRER);
  }, [addAchievement, ACHIEVEMENTS]);

  const projects = [
    {
      id: 'rocking-chair',
      title: 'Sam Maloof-Style Rocking Chair',
      description: '18 months of patient craftsmanship',
      image: '/images/rocking-chair.jpg',
      story: 'Inspired by the legendary Sam Maloof, I spent 18 months crafting this rocking chair. Each joint was hand-carved, each curve carefully shaped. The chair taught me that some things can\'t be rushed - excellence takes time.',
      materials: 'American walnut, hand-rubbed oil finish, traditional joinery techniques',
      lesson: 'When you plane a piece of wood, you can\'t rush it. The same is true in business - patience and precision yield the best results.'
    },
    {
      id: 'jewelry-box',
      title: 'Walnut Jewelry Box',
      description: 'A gift of love, crafted by hand',
      image: '/images/jewelry-box.jpg',
      story: 'Created as a anniversary gift for my wife. Every dovetail joint was cut by hand, each corner perfectly fitted. What started as a simple box became a meditation on precision and care.',
      materials: 'Black walnut with maple accents, felt-lined compartments, hidden drawer mechanism',
      lesson: 'The smallest details matter most. In woodworking and in life, it\'s the invisible joints that hold everything together.'
    },
    {
      id: 'hollow-vessel',
      title: 'Maple Burl Vessel',
      description: 'Dancing on the edge of possibility',
      image: '/images/hollow-vessel.jpg',
      story: 'Turning this hollow vessel from a maple burl was like a high-stakes negotiation. One wrong move and months of work would shatter. The thrill of creating something beautiful from raw wood never gets old.',
      materials: 'Figured maple burl, turned on lathe, walls less than 1/8" thick',
      lesson: 'Risk and beauty go hand in hand. The most rewarding achievements come from pushing boundaries carefully.'
    },
    {
      id: 'dining-table',
      title: 'Live-Edge Dining Table',
      description: 'Where family gathers, memories are made',
      image: '/images/dining-table.jpg',
      story: 'Built from a single slab of walnut that fell in a storm. I preserved the natural edge, letting the wood tell its own story. Now it\'s where my family gathers, adding new stories with each meal.',
      materials: 'Black walnut slab, butterfly joints, steel legs with wood accents',
      lesson: 'Honor the material you work with. Whether it\'s wood or people, bringing out natural beauty creates lasting value.'
    },
    {
      id: 'tool-cabinet',
      title: 'Master Tool Cabinet',
      description: 'A craftsman\'s meditation',
      image: '/images/tool-cabinet.jpg',
      story: 'Every craftsman needs a proper home for their tools. Building this cabinet was a meditation on organization and respect for the craft. Each drawer slides perfectly, each tool has its place.',
      materials: 'Cherry wood with oak accents, hand-cut dovetails, custom drawer organizers',
      lesson: 'Organization is the foundation of creativity. When everything has its place, the mind is free to innovate.'
    },
    {
      id: 'sculpture',
      title: 'Abstract Wood Sculpture',
      description: 'When form follows feeling',
      image: '/images/wood-sculpture.jpg',
      story: 'Sometimes you start carving without a plan, letting the wood guide you. This sculpture emerged from a piece of driftwood, shaped by intuition rather than design.',
      materials: 'Reclaimed driftwood, hand-carved and sanded, natural wax finish',
      lesson: 'Not everything needs a blueprint. Sometimes the best innovations come from following your instincts.'
    }
  ];

  const philosophyPoints = [
    {
      title: 'Patience as Practice',
      description: 'Woodworking teaches what no MBA can - that true quality comes from patience. You can\'t rush wood any more than you can rush innovation.'
    },
    {
      title: 'Failure as Teacher',
      description: 'I\'ve ruined countless pieces learning new techniques. Each failure taught me more than any success. The workshop is my laboratory for resilience.'
    },
    {
      title: 'Precision in Everything',
      description: 'A joint off by a millimeter will fail. A business strategy off by a degree compounds into failure. Craftsmanship demands precision in all things.'
    },
    {
      title: 'Joy in Creation',
      description: 'There\'s pure joy in transforming raw material into something beautiful and useful. This joy fuels my work in technology and business.'
    }
  ];

  return (
    <Layout
      title="The Maker's Heart - Craftsmanship & Creativity"
      description="Discover how woodworking and craftsmanship shape Mayank Trivedi's approach to business and life."
      currentPage="makers-heart"
    >
      {/* Hero Section */}
      <Hero
        title="The Maker's Heart"
        subtitle="Where Hands Meet Vision"
        description="In my workshop, surrounded by sawdust and possibilities, I find the same joy I discovered as a boy taking apart radios. Here, patience becomes tangible, and every shaving teaches humility."
        avatarMode={AVATAR_MODES.CRAFTSMAN}
      />

      {/* Introduction */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-navy mb-6">
              From Boardroom to Workshop
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              After days of strategic planning and digital innovation, I find balance in the 
              workshop. Here, working with wood connects me to something timeless - the 
              satisfaction of creating with your hands, the discipline of traditional craft, 
              and the joy of transforming raw materials into lasting beauty.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Each piece I create is a meditation on patience, precision, and purpose. The 
              lessons learned at the workbench often provide the clearest insights for the 
              boardroom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section bg-brand-gray-soft">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-navy mb-4">
              A Gallery of Craftsmanship
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Each piece tells a story of patience, learning, and the joy of creation
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {projects.map((project) => (
              <GalleryItem
                key={project.id}
                {...project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-navy text-center mb-12">
              Lessons from the Workshop
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {philosophyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-brand-walnut/5 rounded-lg p-6 border border-brand-walnut/20"
                >
                  <h3 className="font-sans font-bold text-xl text-brand-walnut mb-3">
                    {point.title}
                  </h3>
                  <p className="text-gray-700">{point.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-brand-gray-soft">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-navy mb-6">
                The Creative Process
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">
                    1. Listen to the Wood
                  </h3>
                  <p className="text-gray-700">
                    Every piece of wood has its own character, grain pattern, and story. 
                    The first step is always to understand what the material wants to become.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">
                    2. Design with Purpose
                  </h3>
                  <p className="text-gray-700">
                    Whether it's a chair or a company, form must follow function. Beauty 
                    emerges when design serves its intended purpose perfectly.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">
                    3. Execute with Patience
                  </h3>
                  <p className="text-gray-700">
                    There are no shortcuts in fine woodworking. Each cut, each joint, each 
                    surface requires full attention and patience.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-sans font-bold text-lg text-brand-navy mb-2">
                    4. Finish with Love
                  </h3>
                  <p className="text-gray-700">
                    The final sanding, the application of finish - these last touches make 
                    the difference between good and exceptional.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="/images/mayank-workshop-process.jpg"
                alt="Mayank in his workshop"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-brand-walnut text-white p-4 rounded-lg shadow-lg">
                <p className="font-sans font-bold">40+ Years</p>
                <p className="text-sm">Of Making & Creating</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="text-2xl md:text-3xl font-serif text-brand-navy leading-relaxed mb-6">
              "In the workshop, I'm reminded why I fell in love with building things. 
              Every project, like every business, starts as a rough idea - and with 
              patience and heart, becomes something real and lasting."
            </blockquote>
            <cite className="text-brand-walnut font-sans font-medium">
              - Mayank Trivedi
            </cite>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default MakersHeartPage;
