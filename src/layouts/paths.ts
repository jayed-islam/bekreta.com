export const paths = {
  root: "/",
  apps: "/apps",
  website: {
    signin: "/signin",
    signup: "/signup",
  },
  page404: "/error/404",
  account: {
    root: "/account",
    course: "/account/course",
    me: "/account/me",
  },
  checkout: "/checkout",
  course: {
    root: "/courses",
  },
  quran: {
    item: (id: string) => `/quran/${id}`,
  },
  dashboard: {
    root: "/dashboard",
    masyalas: {
      root: "/dashboard/masyalas",
      create: "/dashboard/masyalas/create",
      list: "/dashboard/masyalas/list",
    },
    lectures: {
      root: "/dashboard/lectures",
      create: "/dashboard/lectures/create",
      list: "/dashboard/lectures/list",
    },
    sharyesolution: {
      root: "/dashboard/sharyesolution",
      create: "/dashboard/sharyesolution/create",
      list: "/dashboard/sharyesolution/list",
      eidt: (id: string) => `/dashboard/sharyesolution/${id}/edit`,
    },
    user: {
      root: "/dashboard/user",
      create: "/dashboard/user/create",
      list: "/dashboard/user/list",
    },
    qlite: {
      root: "/dashboard/qlite",
      create: "/dashboard/qlite/create",
      list: "/dashboard/qlite/list",
      story: "dashboard/qlite/story",
      eidt: (id: string) => `/dashboard/qlite/${id}/edit`,
    },
    recentItem: {
      root: "/dashboard/recent",
      create: "/dashboard/recent/create",
      list: "/dashboard/recent/list",
      eidt: (id: string) => `/dashboard/recent/${id}/edit`,
    },
    course: {
      root: "/dashboard/course",
      create: "/dashboard/course/create",
      list: "/dashboard/course/list",
      eidt: (id: string) => `/dashboard/course/${id}/edit`,
    },
    foundation: {
      root: "/dashboard/foundation",
      create: "/dashboard/foundation/create",
      list: "/dashboard/foundation/list",
      eidt: (id: string) => `/dashboard/foundation/${id}/edit`,
    },
    hijriDate: {
      root: "/dashboard/hijridate",
      create: "/dashboard/hijridate/create",
      list: "/dashboard/hijridate/list",
    },
  },
  signin: "/auth/signin",
  signup: "/auth/signup",
};
