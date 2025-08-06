"use client";

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80; // Account for fixed navbar height
    const elementPosition = element.offsetTop - offset;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

export const handleNavClick = (sectionId: string, event?: React.MouseEvent) => {
  if (event) {
    event.preventDefault();
  }
  scrollToSection(sectionId);
};
