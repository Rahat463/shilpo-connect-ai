import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Send, Trash2, Video } from "lucide-react";
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

      const { error } = await supabase
        .from("messages")
        .insert({
          sender_id: user.id,
          receiver_id: receiver.id,
          subject: newMessage.subject,
          content: newMessage.content
        });

      if (error) throw error;

      toast.success("Message sent successfully");
      setNewMessage({ to: "", subject: "", content: "" });
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