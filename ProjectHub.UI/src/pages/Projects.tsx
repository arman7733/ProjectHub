import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Search, Calendar, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProjectForm } from '@/components/forms/ProjectForm';

const projects = [
  {
    id: 1,
    name: 'E-commerce Platform',
    description: 'Building a modern e-commerce solution',
    status: 'In Progress',
    progress: 75,
    manager: 'John Doe',
    team: 8,
    deadline: '2025-12-15',
  },
  {
    id: 2,
    name: 'Mobile App Redesign',
    description: 'Redesigning the mobile application UI/UX',
    status: 'In Progress',
    progress: 45,
    manager: 'Sarah Johnson',
    team: 5,
    deadline: '2025-11-30',
  },
  {
    id: 3,
    name: 'API Integration',
    description: 'Integrating third-party APIs',
    status: 'Review',
    progress: 90,
    manager: 'Mike Wilson',
    team: 3,
    deadline: '2025-11-15',
  },
  {
    id: 4,
    name: 'Dashboard Analytics',
    description: 'Creating analytics dashboard',
    status: 'Planning',
    progress: 30,
    manager: 'Emily Brown',
    team: 6,
    deadline: '2026-01-20',
  },
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-info text-info-foreground';
      case 'Review':
        return 'bg-warning text-warning-foreground';
      case 'Planning':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage and track your projects</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Add a new project to your workspace</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <ProjectForm onSuccess={() => setDialogOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </div>
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{project.team} members</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(project.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">Manager: {project.manager}</span>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
