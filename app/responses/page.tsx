"use client";

import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase";

type ResponseData = {
  id: string;
  name: string;
  status: "Accepted" | "Rejected";
  timestamp: number;
};

export default function ResponsesPage() {
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reference the exact same path we used to save the data
    const responsesRef = ref(db, "trikon_3_0_Invitations");
    
    // Set up a real-time listener
    const unsubscribe = onValue(responsesRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data) {
        // Convert the Firebase object into an array
        const parsedData: ResponseData[] = Object.keys(data).map((key) => ({
          id: key,
          name: data[key].name,
          status: data[key].status,
          timestamp: data[key].timestamp,
        }));
        
        // Sort to show the newest responses first
        parsedData.sort((a, b) => b.timestamp - a.timestamp);
        
        setResponses(parsedData);
      } else {
        // No data found
        setResponses([]);
      }
      
      setLoading(false);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#020817] text-slate-200 p-6 md:p-12 font-['Montserrat'] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.25),transparent_32%),radial-gradient(circle_at_85%_82%,rgba(30,64,175,0.22),transparent_35%),radial-gradient(circle_at_55%_52%,rgba(99,102,241,0.16),transparent_45%)] pointer-events-none"></div>
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-indigo-200 to-blue-300 mb-4 uppercase tracking-[0.2em] text-center">
            Trikon 3.0 Responses
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full"></div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : responses.length === 0 ? (
          <div className="text-center text-slate-300 mt-20 text-xl border border-slate-700 bg-slate-900/70 p-12 rounded-2xl backdrop-blur-sm">
            <p className="tracking-widest uppercase">No responses recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-700 shadow-[0_20px_60px_-30px_rgba(2,6,23,0.8)] bg-slate-900/70 backdrop-blur-md">
            <table className="w-full text-left border-collapse min-w-full">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700">
                  <th className="p-6 tracking-[0.15em] text-slate-300 uppercase text-sm font-bold w-1/3">Guest Name</th>
                  <th className="p-6 tracking-[0.15em] text-slate-300 uppercase text-sm font-bold w-1/3">Decision</th>
                  <th className="p-6 tracking-[0.15em] text-slate-300 uppercase text-sm font-bold text-right w-1/3">Time (Local)</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((res) => (
                  <tr key={res.id} className="border-b border-slate-800 hover:bg-slate-800/70 transition-colors">
                    <td className="p-6 font-medium text-lg tracking-wide">
                      {res.name || "Unknown Guest"}
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold tracking-[0.15em] uppercase ${
                        res.status === "Accepted" 
                          ? "bg-green-500/10 text-green-400 border border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.2)]" 
                          : "bg-red-500/10 text-red-500 border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                      }`}>
                        {res.status === "Accepted" ? (
                          <span className="mr-2 h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                        ) : (
                          <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span>
                        )}
                        {res.status}
                      </span>
                    </td>
                    <td className="p-6 text-slate-400 text-sm text-right font-mono">
                      {new Date(res.timestamp).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}