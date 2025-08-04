import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  animate?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconSize?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  hover = true,
  animate = true,
  className = '',
  onClick,
  href,
  icon: Icon,
  iconColor = 'text-primary-red',
  iconSize = 24,
}) => {
  // Base classes
  const baseClasses = 'relative overflow-hidden rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-offset-2 focus:ring-offset-dark-5';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-dark-25 border border-dark-30',
    elevated: 'bg-dark-25 border border-dark-30 shadow-lg',
    outlined: 'bg-transparent border border-dark-30',
    gradient: 'bg-gradient-to-br from-dark-25 to-dark-20 border border-dark-30',
    dark: 'bg-dark-20 border border-dark-30',
  };

  // Size classes
  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  // Hover classes
  const hoverClasses = hover ? 'hover:border-primary-red/50 hover:shadow-xl hover:shadow-primary-red/10' : '';

  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${hoverClasses} ${className}`;

  // Icon component
  const IconComponent = Icon && (
    <div className={`${iconColor} mb-4`}>
      <Icon size={iconSize} />
    </div>
  );

  // Content
  const content = (
    <>
      {IconComponent}
      {children}
    </>
  );

  // If href is provided, render as Link
  if (href) {
    const LinkComponent = animate ? motion.a : 'a';
    const linkProps = animate ? {
      whileHover: hover ? { y: -4, scale: 1.02 } : {},
      whileTap: { scale: 0.98 },
    } : {};

    return (
      <LinkComponent
        href={href}
        className={cardClasses}
        {...linkProps}
      >
        {content}
      </LinkComponent>
    );
  }

  // If onClick is provided, render as button
  if (onClick) {
    const ButtonComponent = animate ? motion.button : 'button';
    const buttonProps = animate ? {
      whileHover: hover ? { y: -4, scale: 1.02 } : {},
      whileTap: { scale: 0.98 },
    } : {};

    return (
      <ButtonComponent
        onClick={onClick}
        className={cardClasses}
        {...buttonProps}
      >
        {content}
      </ButtonComponent>
    );
  }

  // Render as div
  const DivComponent = animate ? motion.div : 'div';
  const divProps = animate ? {
    whileHover: hover ? { y: -4, scale: 1.02 } : {},
  } : {};

  return (
    <DivComponent
      className={cardClasses}
      {...divProps}
    >
      {content}
    </DivComponent>
  );
};

// Card Header component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

// Card Title component
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle: React.FC<CardTitleProps> = ({ 
  children, 
  className = '', 
  as: Component = 'h3' 
}) => (
  <Component className={`text-xl font-bold text-white mb-2 ${className}`}>
    {children}
  </Component>
);

// Card Subtitle component
interface CardSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardSubtitle: React.FC<CardSubtitleProps> = ({ children, className = '' }) => (
  <p className={`text-gray-400 text-sm ${className}`}>
    {children}
  </p>
);

// Card Content component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

// Card Footer component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`mt-6 pt-4 border-t border-dark-30 ${className}`}>
    {children}
  </div>
);

export default Card; 