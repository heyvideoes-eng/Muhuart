"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function GiftFinderQuiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    recipient: "",
    occasion: "",
    style: "",
    budget: ""
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const resetQuiz = () => {
    setStep(1);
    setAnswers({ recipient: "", occasion: "", style: "", budget: "" });
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#F8F8F8] px-[4vw] py-16">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-light mb-4">The Gift Finder</h1>
        <p className="text-gray-600 mb-12">Let us help you find the perfect piece for someone special.</p>

        {/* Step 1: Recipient */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-medium mb-8">Who are you shopping for?</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Partner", "Mother", "Friend", "Myself"].map((option) => (
                <button
                  key={option}
                  onClick={() => { setAnswers({ ...answers, recipient: option }); nextStep(); }}
                  className="py-6 px-4 border border-gray-200 bg-white hover:border-black transition-colors"
                >
                  <span className="text-lg tracking-wide">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Occasion */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-medium mb-8">What is the occasion?</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Anniversary", "Wedding / Bridal", "Birthday", "Just Because"].map((option) => (
                <button
                  key={option}
                  onClick={() => { setAnswers({ ...answers, occasion: option }); nextStep(); }}
                  className="py-6 px-4 border border-gray-200 bg-white hover:border-black transition-colors"
                >
                  <span className="text-lg tracking-wide">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Style */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-medium mb-8">How would you describe their style?</h2>
            <div className="grid grid-cols-3 gap-4">
              {["Minimalist", "Antique & Royal", "Modern Statement"].map((option) => (
                <button
                  key={option}
                  onClick={() => { setAnswers({ ...answers, style: option }); nextStep(); }}
                  className="flex flex-col items-center gap-4 p-4 border border-gray-200 bg-white hover:border-black transition-colors"
                >
                  <div className="w-full aspect-square bg-gray-100 rounded-full mb-2"></div>
                  <span className="text-sm tracking-wide">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Budget */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-medium mb-8">What is your budget?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Under $200", "$200 - $500", "Over $500"].map((option) => (
                <button
                  key={option}
                  onClick={() => { setAnswers({ ...answers, budget: option }); nextStep(); }}
                  className="py-4 px-4 border border-gray-200 bg-white hover:border-black transition-colors"
                >
                  <span className="text-md tracking-wide">{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Results */}
        {step === 5 && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-2xl font-medium mb-2">We found the perfect gifts.</h2>
            <p className="text-gray-600 mb-8">Curated for your {answers.recipient.toLowerCase()}'s {answers.style.toLowerCase()} style.</p>
            
            <div className="grid grid-cols-2 gap-6 mb-12">
              {/* Dummy Results */}
              <div className="flex flex-col text-left group">
                <div className="aspect-[4/5] bg-gray-200 mb-4 overflow-hidden relative">
                   <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                     <span className="bg-white text-black px-6 py-2 text-sm uppercase tracking-widest">View</span>
                   </div>
                </div>
                <h3 className="font-medium text-sm">Signature Solitaire Necklace</h3>
                <p className="text-sm text-gray-500">$450</p>
              </div>
              <div className="flex flex-col text-left group">
                <div className="aspect-[4/5] bg-gray-200 mb-4 overflow-hidden relative">
                   <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                     <span className="bg-white text-black px-6 py-2 text-sm uppercase tracking-widest">View</span>
                   </div>
                </div>
                <h3 className="font-medium text-sm">Antique Heirloom Ring</h3>
                <p className="text-sm text-gray-500">$380</p>
              </div>
            </div>

            <button onClick={resetQuiz} className="text-sm border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
              Retake Quiz
            </button>
          </div>
        )}

        {/* Progress Bar */}
        {step < 5 && (
          <div className="mt-16 max-w-xs mx-auto">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Step {step} of 4</span>
            </div>
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black transition-all duration-500 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
