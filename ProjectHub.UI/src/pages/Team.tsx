import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Search, Mail, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TeamMemberForm } from '@/components/forms/TeamMemberForm';

const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    role: 'Admin',
    projects: 5,
    tasks: 12,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 234 567 8901',
    role: 'Manager',
    projects: 3,
    tasks: 8,
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.w@example.com',
    phone: '+1 234 567 8902',
    role: 'Developer',
    projects: 2,
    tasks: 15,
  },
  {
    id: 4,
    name: 'Emily Brown',
    email: 'emily.b@example.com',
    phone: '+1 234 567 8903',
    role: 'Developer',
    projects: 2,
    tasks: 10,
  },
  {
    id: 5,
    name: 'David Lee',
    email: 'david.l@example.com',
    phone: '+1 234 567 8904',
    role: 'Tester',
    projects: 4,
    tasks: 6,
  },
];

export default function Team() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-destructive text-destructive-foreground';
      case 'Manager':
        return 'bg-primary text-primary-foreground';
      case 'Developer':
        return 'bg-info text-info-foreground';
      case 'Tester':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground">Manage your team members</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>Add a new member to your team</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <TeamMemberForm onSuccess={() => setDialogOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t text-sm">
                <span className="text-muted-foreground">{member.projects} Projects</span>
                <span className="text-muted-foreground">{member.tasks} Tasks</span>
              </div>
              <Button variant="outline" className="w-full" size="sm">
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
