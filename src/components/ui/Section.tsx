import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  container?: boolean;
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  background?: 'default' | 'dark' | 'gradient' | 'transparent' | 'red';
  animate?: boolean;
  delay?: number;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  container = true,
  spacing = 'lg',
  background = 'default',
  animate = true,
  delay = 0,
  id,
}) => {
  // Spacing classes
  const spacingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16 lg:py-20',
    xl: 'py-20 lg:py-24',
    '2xl': 'py-24 lg:py-32',
  };

  // Background classes
  const backgroundClasses = {
    default: 'bg-dark-5',
    dark: 'bg-dark-20',
    gradient: 'bg-gradient-to-br from-dark-5 to-dark-10',
    transparent: 'bg-transparent',
    red: 'bg-gradient-to-r from-primary-red to-red-600',
  };

  const sectionClasses = `${spacingClasses[spacing]} ${backgroundClasses[background]} ${className}`;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay * 0.1,
      },
    },
  };

  // Content with or without container
  const content = container ? (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  ) : (
    children
  );

  // Render with or without animation
  if (animate) {
    return (
      <motion.section
        id={id}
        className={sectionClasses}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        {content}
      </motion.section>
    );
  }

  return (
    <section id={id} className={sectionClasses}>
      {content}
    </section>
  );
};

// Section Header component
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  centered = false,
  className = '',
  animate = true,
  delay = 0,
}) => {
  const headerClasses = `mb-12 ${centered ? 'text-center' : ''} ${className}`;

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay * 0.1,

      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: (delay + 1) * 0.1,

      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: (delay + 2) * 0.1,

      },
    },
  };

  if (animate) {
    return (
      <div className={headerClasses}>
        {subtitle && (
          <motion.p
            variants={subtitleVariants}
            className="text-primary-red font-medium text-sm uppercase tracking-wider mb-2"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.h2
          variants={titleVariants}
          className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4"
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            variants={descriptionVariants}
            className="text-gray-400 text-lg max-w-3xl mx-auto"
          >
            {description}
          </motion.p>
        )}
      </div>
    );
  }

  return (
    <div className={headerClasses}>
      {subtitle && (
        <p className="text-primary-red font-medium text-sm uppercase tracking-wider mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

// Section Grid component
interface SectionGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const SectionGrid: React.FC<SectionGridProps> = ({
  children,
  cols = 3,
  gap = 'lg',
  className = '',
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };

  const gridGap = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  const gridClasses = `grid ${gridCols[cols]} ${gridGap[gap]} ${className}`;

  return <div className={gridClasses}>{children}</div>;
};

export default Section; 