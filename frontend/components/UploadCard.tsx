
import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Camera, Image as ImageIcon, Scan, Maximize, Target, Activity } from 'lucide-react';
import { ThemeColors } from '../constants';

interface UploadCardProps {
  onAnalyze: (image: string) => void;
  loading: boolean;
  theme: ThemeColors;
}

const UploadCard: React.FC<UploadCardProps> = ({ onAnalyze, loading, theme }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setIsCameraActive(false);
      stopCamera();
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsCameraActive(true);
      setPreview(null);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setPreview(canvas.toDataURL('image/jpeg'));
        stopCamera();
      }
    }
  };

  useEffect(() => () => stopCamera(), []);

  const isLight = document.body.classList.contains('light-mode');

  return (
    <div className="w-full h-full flex flex-col group">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
          <Target size={14} className="text-indigo-500" /> Capture Console 01
        </h3>
        {preview && !loading && (
          <button onClick={() => setPreview(null)} className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors">
            Discard Source
          </button>
        )}
      </div>

      <div className={`flex-1 glass-card rounded-[2.5rem] p-5 flex flex-col relative overflow-hidden shadow-2xl border-2 transition-all duration-500 ${
        isLight ? 'bg-white border-slate-100' : 'bg-slate-950/50 border-white/5'
      }`}>
        {/* Main Capture Viewport */}
        <div 
          className={`flex-1 relative rounded-[1.8rem] transition-all duration-500 flex flex-col items-center justify-center overflow-hidden bg-black group/viewport ${
            isDragging ? 'ring-2 ring-indigo-500 ring-offset-4 ring-offset-transparent' : ''
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
        >
          {/* Brackets Overlay */}
          <div className="absolute inset-4 pointer-events-none z-20">
            <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${isLight ? 'border-slate-400' : 'border-white/20'}`} />
            <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 ${isLight ? 'border-slate-400' : 'border-white/20'}`} />
            <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 ${isLight ? 'border-slate-400' : 'border-white/20'}`} />
            <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${isLight ? 'border-slate-400' : 'border-white/20'}`} />
          </div>

          {/* Technical Metadata Overlays */}
          <div className="absolute top-8 left-8 z-30 pointer-events-none hidden sm:block">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">REC [READY]</span>
              <span className="text-[8px] font-mono text-white/40">FR: 60.00</span>
            </div>
          </div>
          <div className="absolute top-8 right-8 z-30 pointer-events-none text-right hidden sm:block">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">SYS: 04.X-A</span>
              <span className="text-[8px] font-mono text-white/40">LAT: 0.00ms</span>
            </div>
          </div>

          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          <canvas ref={canvasRef} className="hidden" />

          {isCameraActive ? (
            <div className="relative w-full h-full">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <div className="scan-line" />
              <div className="absolute inset-0 border-[60px] border-black/30 pointer-events-none" />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-6 z-40">
                <button 
                  onClick={capturePhoto}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all p-1"
                >
                  <div className="w-full h-full rounded-full border-2 border-slate-900" />
                </button>
                <button 
                  onClick={stopCamera}
                  className="w-16 h-16 bg-white/10 backdrop-blur-xl text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/20"
                >
                  <X size={28} />
                </button>
              </div>
            </div>
          ) : preview ? (
            <div className="relative w-full h-full group/preview">
              <img src={preview} alt="Preview" className="w-full h-full object-cover group-hover/preview:scale-105 transition-transform duration-[2s]" />
              {loading && <div className="scan-line" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Source Verified</span>
              </div>
            </div>
          ) : (
            <div className="relative z-10 text-center flex flex-col items-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
                <div className="relative w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 backdrop-blur-md group-hover/viewport:border-indigo-500/50 transition-colors">
                  <Maximize size={40} className="group-hover/viewport:scale-110 transition-transform" />
                </div>
              </div>
              <h4 className="text-xl font-black text-white mb-2 tracking-tight">Biometric Capture</h4>
              <p className="text-xs font-medium text-white/40 max-w-[240px] leading-relaxed mb-8">
                Drop high-resolution asset or activate sensor array for facial data extraction.
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white transition-all"
                >
                  <ImageIcon size={14} /> Import File
                </button>
                <button 
                  onClick={startCamera}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-indigo-600/20"
                >
                  <Camera size={14} /> Sensor Array
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Trigger */}
        <button
          onClick={() => preview && onAnalyze(preview)}
          disabled={!preview || loading || isCameraActive}
          className={`mt-6 w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all relative overflow-hidden group/btn ${
            !preview || loading 
            ? 'bg-slate-200/10 text-slate-600 border border-white/5 cursor-not-allowed' 
            : 'bg-indigo-600 text-white shadow-2xl hover:brightness-110 active:scale-[0.98]'
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Parsing Neural Grid...
            </>
          ) : (
            <>
              <Scan size={18} className="group-hover/btn:rotate-90 transition-transform duration-500" /> 
              Execute Neural Mapping
            </>
          )}
          {loading && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />}
        </button>
      </div>
      
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default UploadCard;
