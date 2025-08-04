import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'animated';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  customIcon?: string; // Path to custom icon image
  iconPosition?: 'left' | 'right';
  className?: string;
  fullWidth?: boolean;
  animate?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  icon: Icon,
  customIcon,
  iconPosition = 'left',
  className = '',
  fullWidth = false,
  animate = true,
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-red to-red-600 text-white hover:from-red-700 hover:to-red-800 focus:ring-primary-red transform hover:scale-105',
    secondary: 'bg-dark-25 text-white border border-dark-30 hover:bg-dark-20 hover:border-dark-35 focus:ring-dark-35',
    outline: 'bg-transparent text-primary-red border border-primary-red hover:bg-primary-red hover:text-white focus:ring-primary-red',
    ghost: 'bg-transparent text-grey-70 hover:text-primary-red hover:bg-dark-25 focus:ring-primary-red',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    animated: 'relative overflow-hidden',
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';

  // Icon classes
  const iconClasses = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`;

  // Loading spinner
  const LoadingSpinner = () => (
    <div className={`${iconClasses[size]} border-2 border-current border-t-transparent rounded-full animate-spin`} />
  );

  // Icon component
  const IconComponent = Icon && (
    <Icon className={`${iconClasses[size]} ${iconPosition === 'right' ? 'ml-2' : 'mr-2'}`} />
  );

  // Custom icon component
  const CustomIconComponent = customIcon && (
    <img 
      src={customIcon} 
      alt="icon" 
      className={`${iconClasses[size]} ${iconPosition === 'right' ? 'ml-2' : 'mr-2'}`}
    />
  );

  // Content with proper icon positioning
  const content = (
    <>
      {loading ? (
        <>
          <LoadingSpinner />
          <span className="ml-2">Loading...</span>
        </>
      ) : (
        <>
          {(Icon || customIcon) && iconPosition === 'left' && (IconComponent || CustomIconComponent)}
          {children}
          {(Icon || customIcon) && iconPosition === 'right' && (IconComponent || CustomIconComponent)}
        </>
      )}
    </>
  );

  // Animated button with custom CSS animation
  if (variant === 'animated') {
    const AnimatedButton = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button
        {...props}
        className={`custom-animated-btn ${className} ${fullWidth ? 'w-full' : ''}`}
      >
        {children}
      </button>
    );

    // If href is provided, render as Link
    if (href) {
      return (
        <a href={href} className={buttonClasses}>
          <AnimatedButton>{content}</AnimatedButton>
        </a>
      );
    }

    return (
      <AnimatedButton
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {content}
      </AnimatedButton>
    );
  }

  // If href is provided, render as Link
  if (href) {
    const LinkComponent = animate ? motion.a : 'a';
    const linkProps = animate ? {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
    } : {};

    return (
      <LinkComponent
        href={href}
        className={buttonClasses}
        {...linkProps}
      >
        {content}
      </LinkComponent>
    );
  }

  // Render as button
  const ButtonComponent = animate ? motion.button : 'button';
  const buttonProps = animate ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  } : {};

  return (
    <ButtonComponent
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      {...buttonProps}
    >
      {content}
    </ButtonComponent>
  );
};

export default Button; 