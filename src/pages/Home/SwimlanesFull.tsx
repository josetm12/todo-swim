import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function Swimlanes() {
  return (
    <div className="min-h-20 flex flex-row items-start justify-between">
      <Lane />
      <Separator orientation="vertical" className="h-full" />
      <Lane />
      <Separator orientation="vertical" />
      <Lane />
    </div>
  );
}

function Lane({ laneTitle = 'Todo' }) {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
  return (
    <>
      <div className="flex flex-col items-start">
        <h3 className="text-5xl">{laneTitle}</h3>
        <ScrollArea className="rounded-md border h-screen">
          {' '}
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {tags.map((tag) => (
              <>
                <div key={tag} className="text-sm">
                  {tag}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
