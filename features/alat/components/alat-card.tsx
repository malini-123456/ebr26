import { prisma } from "@/lib/prisma"
import { cn } from "@/lib/utils"



export default async function AlatCard({
  id,
}: {
  id: number
}) {

  console.log("ID RECEIVED:", id)

  const values = await prisma.alat.findUnique({
    where: { id },

    include: {
      ruangan: true,
    }
  })

  if (!values) {
    return <div>Alat tidak ditemukan</div>
  }

  const models = [

    {
      id: 1,
      title: "Nama Alat",
      value: values?.nama,
    },
    {
      id: 2,
      title: "Merek",
      value: values?.merek,
    },
    {
      id: 3,
      title: "Tipe",
      value: values?.tipe,
    },
    {
      id: 4,
      title: "No. Seri",
      value: values?.noSeri,
    },
    {
      id: 5,
      title: "Ruangan",
      value: values?.ruangan?.namaRuangan,
    },
    {
      id: 6,
      title: "Tahun",
      value: values?.tahun,
    },
    {
      id: 7,
      title: "Kalibrasi",
      value: values?.kalibrasi
        ? new Date(values.kalibrasi).toLocaleDateString("id-ID")
        : "-",
    },
    {
      id: 8,
      title: "Keterangan",
      value: values?.keterangan,
    },

  ]
  return (
    <div className={cn(
      "overflow-hidden rounded-xl border bg-card text-card-foreground shadow",
      "flex flex-col md:flex-row"
    )}>

      {/* Left Image */}
      <div className="md:w-1/3 w-full">
        <img
          src="/globe.svg"
          alt="Foto"
          className="h-56 w-full object-cover md:h-full"
        />
      </div>

      {/* Right Content */}
      <div className="md:w-2/3 w-full p-6 md:p-8 space-y-4">
        {models.map((model) => (
          <div key={model.id} className="flex gap-3">
            <span className="font-semibold w-32 md:w-48">
              {model.title}
            </span>
            <span>
              {model.value ?? "-"}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}