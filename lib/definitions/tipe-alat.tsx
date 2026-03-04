export type Alat = {
  id: number;
  nama: string;
  merek: string;
  tipe: string;
  noSeri: string;
  ruanganId: number;
  ruangan: {
    namaRuangan: string;
  };
  tahun: number;
  kalibrasi: Date | null;
  keterangan: string | null;
  createdAt: Date;
};