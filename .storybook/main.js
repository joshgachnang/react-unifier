module.exports = {
  stories: ["../src/**/*.stories.(tsx|mdx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", {flow: false, typescript: true}]],
      },
    });

    // Load CSS Modules
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        "style-loader",
        "css-modules-typescript-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },
      ],
    });

    // Load plain CSS (and skip CSS modules)
    config.module.rules.push({
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: ["style-loader", "css-loader"],
      // include: path.resolve(__dirname, "../"),
    });

    // Generate docs from JSDoc for stories
    config.module.rules.push({
      test: /\.stories\.tsx$/,
      use: [{loader: "story-description-loader", options: {isTSX: true}}],
    });

    // use svgr for svg files
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    });

    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
