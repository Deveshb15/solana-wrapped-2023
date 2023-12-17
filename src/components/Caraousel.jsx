import React, { useState } from 'react';

import Card1 from './Card1';
import Card2 from './Card2';
import Card3 from './Card3';
import Card4 from './Card4';
import Card5 from './Card5';
import Card6 from './Card6';

const Carousel = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const slides = [
        <Card1 key={1} />, <Card2 key={2} />, <Card3 key={3} />, <Card4 key={4} />, <Card5 key={5} />, <Card6 key={6} />
    ];

    const goToSlide = (index) => {
        setActiveSlide(index);
    };

    const goToPrevSlide = () => {
        setActiveSlide(activeSlide - 1 >= 0 ? activeSlide - 1 : slides.length - 1);
    };

    const goToNextSlide = () => {
        setActiveSlide(activeSlide + 1 < slides.length ? activeSlide + 1 : 0);
    };

    return (
        <div className="min-h-screen p-8  relative"> 
            <div className="w-64 mx-auto flex justify-center mb-4">
                {slides.map((_, index) => (
                    <div key={index} className={`h-1 flex-1 w-1 mx-1 ${index === activeSlide ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                ))}
            </div>  
            <div className="w-96 mx-auto" style={{ scrollSnapType: 'x mandatory' }}>
            {slides.map((Slide, index) => (
                    <div key={index} className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                        {Slide}
                    </div>
                ))}
                <div className="absolute top-1/2 w-full flex justify-between z-20">
                <button onClick={goToPrevSlide} className="cursor-pointer lg:-translate-x-32 bg-white rounded-full shadow-md p-2">
                        <svg className="w-6 h-6 text-gray-800" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button onClick={goToNextSlide} className="cursor-pointer lg:translate-x-16 -translate-x-28      bg-white rounded-full shadow-md p-2">
                        <svg className="w-6 h-6 text-gray-800" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
