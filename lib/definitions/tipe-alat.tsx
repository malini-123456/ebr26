export type Alat = {
  id: number;
  nama: string;
  merek: string | null;
  tipe: string | null;
  noSeri: string | null;
  ruanganId: number;
  ruangan: {
    namaRuangan: string;
  };
  tahun: number | null;
  kalibrasi: Date | null;
  keterangan: string | null;
  createdAt: Date;
  ipm?: {
    hasil: string;
    createdAt: Date;
  }[];
};