interface Options {
  file: string;
  jsxbin?: string;
}

declare function jsxbin2(options: Options): {
  name: string;
  version: string;
  generateBundle(outputOptions: any, bundle: any): Promise<void>;
};

export default jsxbin2;
