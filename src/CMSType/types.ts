export interface CMSEditProps<T> {
  onChange: (s: T) => void;
  value?: T;
  label?: string;
}

export interface CMSConfigSettings {
  label: string;
}
