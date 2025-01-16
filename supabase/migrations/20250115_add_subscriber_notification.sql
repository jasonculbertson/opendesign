-- Create a function to handle the notification
create or replace function public.handle_new_subscriber()
returns trigger as $$
begin
  perform net.http_post(
    url := 'https://YOUR_PROJECT_REF.functions.supabase.co/notify-new-subscriber',
    headers := '{"Content-Type": "application/json"}',
    body := json_build_object('record', row_to_json(NEW))::text
  );
  return NEW;
end;
$$ language plpgsql security definer;

-- Create the trigger
drop trigger if exists on_new_subscriber on public.subscribers;
create trigger on_new_subscriber
  after insert on public.subscribers
  for each row
  execute procedure public.handle_new_subscriber();
