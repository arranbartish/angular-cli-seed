declare global {
  /*
   WebStorm produces a warning for Editor -> introspection -> TypeScript
   Reference to a UMD global: Report the use of references to a UMD global if the current file is a module.
     You can turn off this introspection to remove the weak warnings in your tests, however the this will also do the
     same in your production code.
   */
  const sinon: sinon.SinonStatic;
}
export {};
