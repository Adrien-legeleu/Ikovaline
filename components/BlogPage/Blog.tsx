import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const dataBlog = [
  {
    date: "ioiosidosido",
    title: "dsdsd",
    desc: "dsdsd",
    img: "dds",
    by: "sdsdsds",
  },
  {
    date: "ioiosidosido",
    title: "dsdsd",
    desc: "dsdsd",
    img: "dds",
    by: "sdsdsds",
  },
];

function Blog() {
  return (
    <div className="w-full py-20 px-10 lg:py-40 max-w-[1400px] max-auto">
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
            Blogs Récents
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataBlog.map((bl, index) => {
            return (
              <div
                className={`flex flex-col gap-4 hover:opacity-75 cursor-pointer ${index == 0 && "md:col-span-2 lg:col-span-3"}`}
              >
                <div className="bg-muted rounded-3xl aspect-video"></div>
                <div className="flex flex-row gap-4 items-center">
                  <Badge>Nouveau</Badge>
                  <p className="flex flex-row gap-2 text-sm items-center">
                    <span className="text-muted-foreground">By</span>{" "}
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{bl.by}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="max-w-3xl text-2xl tracking-tight">
                    {bl.title}]
                  </h3>
                  <p className="max-w-3xl text-muted-foreground text-base">
                    {bl.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { Blog };
