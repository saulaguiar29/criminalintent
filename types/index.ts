// Crime data structure
export interface Crime {
  id: string;
  title: string;
  details: string;
  date: Date;
  solved: boolean;
  photoUri?: string;
}

// Theme structure
export interface Theme {
  id: string;
  name: string;
  colors: {
    background: string;
    card: string;
    text: string;
    subtext: string;
    border: string;
    primary: string;
    danger: string;
  };
  dark: boolean;
}
