export class Medicine {
  id: number;
  name: string;
  manufacturer: string;
  form: string;
  contraindications: string;
  interaction: string;
  packageContents: string;
  admissionMethod: string;
  description: string;
  isExpired?: boolean;
}
