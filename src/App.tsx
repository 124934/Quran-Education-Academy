/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LogoProvider } from './context/LogoContext';
import { BackgroundProvider } from './context/BackgroundContext';
import { IslamicPatternBackground } from './components/IslamicPatternBackground';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppModal } from './components/WhatsAppModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PatternPureView } from './components/PatternPureView';
import { LogoPickerModal } from './components/LogoPickerModal';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { WhyChooseUsPage } from './pages/WhyChooseUsPage';
import { ContactUsPage } from './pages/ContactUsPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<string | undefined>();
  const [isPurePatternMode, setIsPurePatternMode] = useState(false);

  const handleOpenWhatsAppModal = (course?: string) => {
    setSelectedCourseForModal(course);
    setIsWhatsAppModalOpen(true);
  };

  const handleCloseWhatsAppModal = () => {
    setIsWhatsAppModalOpen(false);
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pure pattern view mode
  if (isPurePatternMode) {
    return (
      <>
        <PatternPureView
          onExit={() => setIsPurePatternMode(false)}
          onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
        />
        <LogoPickerModal />
      </>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-950">
      {/* 
        Full-Page Original Islamic Geometric Pattern Background:
        Displays the authentic motif across the entire website, with live edit & upload capabilities!
      */}
      <IslamicPatternBackground fixed={true} />

      {/* Main Navigation with Circular Logo (no camera icon) and Edit Background button */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenWhatsAppModal={handleOpenWhatsAppModal}
        isPurePatternMode={isPurePatternMode}
        onTogglePurePattern={() => setIsPurePatternMode(!isPurePatternMode)}
      />

      {/* Main Dynamic Page Content */}
      <main className="flex-1 w-full relative z-10">
        {currentPage === 'home' && (
          <HomePage
            onOpenWhatsAppModal={handleOpenWhatsAppModal}
            onNavigateCourses={() => handleNavigate('courses')}
            onNavigateWhyChooseUs={() => handleNavigate('why-choose-us')}
            onNavigateContact={() => handleNavigate('contact')}
          />
        )}

        {currentPage === 'courses' && (
          <CoursesPage onOpenWhatsAppModal={handleOpenWhatsAppModal} />
        )}

        {currentPage === 'why-choose-us' && (
          <WhyChooseUsPage
            onOpenWhatsAppModal={() => handleOpenWhatsAppModal()}
            onNavigateContact={() => handleNavigate('contact')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactUsPage onOpenWhatsAppModal={() => handleOpenWhatsAppModal()} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenWhatsAppModal={handleOpenWhatsAppModal}
      />

      {/* Persistent Floating WhatsApp Button */}
      <FloatingWhatsApp onOpenModal={() => handleOpenWhatsAppModal()} />

      {/* Direct WhatsApp Admission Form Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={handleCloseWhatsAppModal}
        initialCourse={selectedCourseForModal}
      />

      {/* Logo Picker & Custom Logo Uploader Modal */}
      <LogoPickerModal />
    </div>
  );
}

export default function App() {
  return (
    <LogoProvider>
      <BackgroundProvider>
        <AppContent />
      </BackgroundProvider>
    </LogoProvider>
  );
}
