"use client";

import { useState, useRef, useEffect, useCallback, ChangeEvent, FormEvent } from "react";
import { electionProcessChat } from "@/ai/flows/election-process-chat";
import { toast } from "@/hooks/use-toast";

export type Message = {
  role: "user" | "bot";
  content: string;
  image?: string;
};

/**
 * useVoterBot - Custom hook to manage AI Chat Assistant state and logic.
 * Encapsulates message history, image processing, and API orchestration.
 */
export function useVoterBot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I'm Electionflow. How can I help you today? I can also explain things simply for kids!" }
  ]);
  const [input, setInput] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEli10, setIsEli10] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  // Cleanup Object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (selectedImage && selectedImage.startsWith('blob:')) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  const handleImageSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "Image too large", description: "Please select a file under 5MB.", variant: "destructive" });
        return;
      }
      
      const objectUrl = URL.createObjectURL(file);
      setSelectedImage(objectUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const clearImage = useCallback(() => {
    if (selectedImage && selectedImage.startsWith('blob:')) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);
    setBase64Image(null);
  }, [selectedImage]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input;
    const userImage = selectedImage;
    const userBase64 = base64Image;
    
    setInput("");
    setSelectedImage(null);
    setBase64Image(null);
    setMessages(prev => [...prev, { role: "user", content: userMessage, image: userImage || undefined }]);
    setIsLoading(true);

    try {
      const response = await electionProcessChat({ 
        query: userMessage, 
        location: location.trim() || undefined,
        mode: isEli10 ? 'eli10' : 'standard',
        image: userBase64 || undefined
      });
      setMessages(prev => [...prev, { role: "bot", content: response.answer }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, selectedImage, base64Image, isLoading, location, isEli10]);

  return {
    messages,
    input,
    setInput,
    location,
    setLocation,
    isLoading,
    isEli10,
    setIsEli10,
    selectedImage,
    scrollRef,
    fileInputRef,
    handleImageSelect,
    clearImage,
    handleSubmit
  };
}
