export type Db = {
    userStore: any;
    gymStore: any;
    init?: (storeType: string) => void;
  };