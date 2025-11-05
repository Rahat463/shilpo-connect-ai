import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Send, Trash2, Video, Mic, Square, Play, Pause } from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  subject: string | null;
  content: string;
  read: boolean;
  created_at: string;
  conversation_id: string | null;
  sender_profile?: {
    full_name: string;
  };
}

export default function Inbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState({ to: "", subject: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("messages")
        .select(`
          *,
          sender_profile:profiles!messages_sender_id_fkey(full_name)
        `)
        .eq("receiver_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    const { error } = await supabase
      .from("messages")
      .update({ read: true })
      .eq("id", messageId);

    if (!error) {
      setMessages(messages.map(m => m.id === messageId ? { ...m, read: true } : m));
    }
  };

  const deleteMessage = async (messageId: string) => {
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", messageId);

    if (error) {
      toast.error("Failed to delete message");
    } else {
      setMessages(messages.filter(m => m.id !== messageId));
      toast.success("Message deleted");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started");
    } catch (error) {
      toast.error("Failed to start recording");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording stopped");
    }
  };

  const playAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => setIsPlaying(false);
      audio.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const sendMessage = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Find receiver by email or name
      const { data: receiver } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", newMessage.to)
        .maybeSingle();

      if (!receiver) {
        toast.error("Recipient not found");
        return;
      }

      let messageContent = newMessage.content;

      // If there's a voice message, convert to base64 and prepend
      if (audioBlob) {
        const reader = new FileReader();
        const base64Audio = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(audioBlob);
        });
        messageContent = `[VOICE_MESSAGE]${base64Audio}\n\n${newMessage.content}`;
      }

      const { error } = await supabase
        .from("messages")
        .insert({
          sender_id: user.id,
          receiver_id: receiver.id,
          subject: newMessage.subject,
          content: messageContent
        });

      if (error) throw error;

      toast.success("Message sent successfully");
      setNewMessage({ to: "", subject: "", content: "" });
      setAudioBlob(null);
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Mail className="h-6 w-6 text-primary" />
          Inbox
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-hero">
              <Send className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Compose Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>To (email)</Label>
                <Input
                  value={newMessage.to}
                  onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
                  placeholder="recipient@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  placeholder="Message subject"
                />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  placeholder="Type your message here..."
                  rows={5}
                />
              </div>
              
              {/* Voice Message Controls */}
              <div className="space-y-2">
                <Label>Voice Message (Optional)</Label>
                <div className="flex gap-2">
                  {!isRecording && !audioBlob && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={startRecording}
                      className="flex-1"
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Record Voice Message
                    </Button>
                  )}
                  
                  {isRecording && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={stopRecording}
                      className="flex-1"
                    >
                      <Square className="mr-2 h-4 w-4" />
                      Stop Recording
                    </Button>
                  )}
                  
                  {audioBlob && !isRecording && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={isPlaying ? pauseAudio : playAudio}
                        className="flex-1"
                      >
                        {isPlaying ? (
                          <><Pause className="mr-2 h-4 w-4" />Pause</>
                        ) : (
                          <><Play className="mr-2 h-4 w-4" />Play</>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setAudioBlob(null)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              <Button onClick={sendMessage} className="w-full">Send Message</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {messages.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No messages yet</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`p-4 cursor-pointer hover:shadow-md transition-all ${
                !message.read ? "bg-accent" : ""
              }`}
              onClick={() => {
                setSelectedMessage(message);
                if (!message.read) markAsRead(message.id);
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">
                      {message.sender_profile?.full_name || "Unknown"}
                    </h4>
                    {!message.read && <Badge variant="secondary">New</Badge>}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {message.subject || "No subject"}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {message.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {format(new Date(message.created_at), "MMM dd, yyyy HH:mm")}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMessage(message.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedMessage && (
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedMessage.subject || "No subject"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  From: {selectedMessage.sender_profile?.full_name || "Unknown"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(selectedMessage.created_at), "MMMM dd, yyyy 'at' HH:mm")}
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Reply
                </Button>
                <Button variant="outline" className="w-full">
                  <Video className="mr-2 h-4 w-4" />
                  Schedule Call
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}