import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faFileAlt, faGraduationCap, faBars, faTimes, faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import FormBTN from "./FormBTN";
import RequestClientForm from "./RequestClientForm";

// Organized form categories for better structure
const formCategories = [
  {
    category: "Academic Services",
    icon: faGraduationCap,
    forms: [
      { btnName: "Authentication", btnLink: "authentication" },
      { btnName: "CAV (Certification Authentication & Verification)", btnLink: "CAV" },
      { btnName: "Correction of Name", btnLink: "CON" },
      { btnName: "Diploma Replacement", btnLink: "DR" },
      { btnName: "Evaluation", btnLink: "evaluation" },
      { btnName: "Transcript of Records", btnLink: "TOR" },
      { btnName: "Honorable Dismissal", btnLink: "HD" }
    ]
  },
  {
    category: "Student Services",
    icon: faBuilding,
    forms: [
      { btnName: "Permit to Study", btnLink: "PTS" },
      { btnName: "Rush Fee", btnLink: "RF" },
      { btnName: "SF 10 ( Form 137 )", btnLink: "SF10" }
    ]
  },
  {
    category: "Request Forms",
    icon: faFileAlt,
    forms: [
      { btnName: "Request Form A", btnLink: "formA.pdf" },
      { btnName: "Request Form B", btnLink: "formB.pdf" },
      { btnName: "Request Form C", btnLink: "formC.pdf" },
      { btnName: "Request Form D", btnLink: "formD.pdf" }
    ]
  }
];

const Formlist = () => {
  const [showClientForm, setShowClientForm] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check initial screen size
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleButtonClick = (btn) => {
    if (btn.btnName.startsWith("Request Form")) {
      // Trigger PDF download for Request Form buttons
      downloadPDF(btn.btnLink);
    } else {
      // Show RequestClientForm
      setShowClientForm(true);
      setSelectedForm(btn.btnName);
    }

    // Close mobile menu if open
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const downloadPDF = (pdfFileName) => {
    // Adjust this path based on your directory structure
    const pdfFilePath = `/path/to/${pdfFileName}`; 
    const link = document.createElement("a");
    link.href = pdfFilePath;
    link.target = "_blank";
    link.download = pdfFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Mobile Category Selector
  const MobileCategorySelector = () => (
    <div className="md:hidden mb-4 bg-gray-100 rounded-lg">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div className="flex items-center">
          <FontAwesomeIcon 
            icon={formCategories[activeCategoryIndex].icon} 
            className="mr-3 text-[#0b1933]" 
          />
          <span className="font-semibold">
            {formCategories[activeCategoryIndex].category}
          </span>
        </div>
        <FontAwesomeIcon 
          icon={isMobileMenuOpen ? faChevronCircleUp : faChevronCircleDown} 
          className="text-gray-600" 
        />
      </div>
      
      {isMobileMenuOpen && (
        <div className="absolute z-10 w-full left-0 bg-white shadow-lg">
          {formCategories.map((category, index) => (
            <div 
              key={index} 
              className={`p-4 border-b hover:bg-gray-100 cursor-pointer flex items-center
                ${index === activeCategoryIndex ? 'bg-blue-50' : ''}`}
              onClick={() => {
                setActiveCategoryIndex(index);
                setIsMobileMenuOpen(false);
              }}
            >
              <FontAwesomeIcon 
                icon={category.icon} 
                className="mr-3 text-[#0b1933]" 
              />
              {category.category}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <RequestClientForm
        isOpen={showClientForm}
        setIsOpen={() => setShowClientForm(!showClientForm)}
        buttonName={selectedForm}
        documentType={selectedForm}
        onBack={() => setShowClientForm(false)}
      />
      
      <div className="bg-white">
        <div className="p-4 md:p-6 border-b border-gray-200 flex items-start">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Service Request Forms
          </h2>
        </div>
        
        {/* Mobile Category Selector */}
        {isMobile && <MobileCategorySelector />}
        
        <div className="p-4 md:p-6">
          {formCategories.map((category, categoryIndex) => (
            // On mobile, only show the active category
            (!isMobile || categoryIndex === activeCategoryIndex) && (
              <div key={categoryIndex} className="mb-6 md:mb-8">
                <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3 md:mb-4 border-b pb-2 flex items-center">
                  <FontAwesomeIcon 
                    icon={category.icon} 
                    className="mr-2 md:mr-3 text-[#0b1933]" 
                  />
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {category.forms.map((btn, index) => (
                    <FormBTN
                      onClick={() => handleButtonClick(btn)}
                      key={index}
                      name={btn.btnName}
                      link={btn.btnLink}
                      className="w-full text-sm md:text-base"
                    />
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Formlist;