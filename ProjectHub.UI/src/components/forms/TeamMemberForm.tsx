import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { teamMemberSchema, TeamMemberInput } from '@/lib/validations';
import { toast } from 'sonner';

interface TeamMemberFormProps {
  onSuccess?: () => void;
}

export function TeamMemberForm({ onSuccess }: TeamMemberFormProps) {
  const form = useForm<TeamMemberInput>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'Developer',
    },
  });

  const onSubmit = async (data: TeamMemberInput) => {
    try {
      // API call to invite team member
      // await api.post('/team/invite', data);
      toast.success('Invitation sent successfully!');
      form.reset();
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to send invitation');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Tester">Tester</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Sending...' : 'Send Invitation'}
        </Button>
      </form>
    </Form>
  );
}
