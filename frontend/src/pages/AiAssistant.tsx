import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface Message { role: 'user'|'assistant'; content: string; }

const SUGGESTIONS = [
  "How many pending leave requests are there?",
  "Summarize this month's expenses",
  "Who are the top performers in Engineering?",
  "What projects are currently active?",
];

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  async function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages(m => [...m, userMsg]); setInput(''); setLoading(true);
    try {
      const { data } = await axios.post('/api/ai/chat', { messages: [...messages, userMsg] });
      setMessages(m => [...m, { role: 'assistant', content: data.reply }]);
    } catch { setMessages(m => [...m, { role: 'assistant', content: 'Sorry, I could not process that. Please try again.' }]); }
    finally { setLoading(false); }
  }
  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <div className="mb-4"><h1 className="text-xl font-bold text-slate-900">AI Assistant</h1><p className="text-sm text-slate-500 mt-1">Ask me anything about your organization</p></div>
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {!messages.length && <div className="grid grid-cols-2 gap-2 mt-4">{SUGGESTIONS.map(s => <button key={s} onClick={() => send(s)} className="text-left bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-600 hover:border-indigo-300 hover:bg-indigo-50">{s}</button>)}</div>}
        {messages.map((m, i) => <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}><div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${m.role==='user'?'bg-indigo-600 text-white':'bg-white border border-slate-200 text-slate-800'}`}>{m.content}</div></div>)}
        {loading && <div className="flex justify-start"><div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 flex gap-1">{[0,1,2].map(i => <div key={i} className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{animationDelay:`${i*0.15}s`}} />)}</div></div>}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-3">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter'&&send(input)} placeholder="Ask anything..." className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <button onClick={() => send(input)} disabled={loading||!input.trim()} className="bg-indigo-600 text-white rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-60">Send</button>
      </div>
    </div>
  );
}
