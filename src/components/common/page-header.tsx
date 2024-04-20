import Link from "next/link";

interface IBreadcrumbProps {
  pageName: string;
  breadcrumbItems: {
    id: number;
    name: string;
    url: string;
  }[];
}

const PageHeader = ({ breadcrumbItems, pageName }: IBreadcrumbProps) => {
  return (
    <div className="bg-white w-full pb-2 pt-3">
      <div className="flex items-start md:items-center flex-col-reverse md:flex-row justify-between h-full w-full max-w-7xl mx-auto px-5 xl:px-0">
        <div className="text-xl font-semibold">{pageName}</div>
        <nav className="flex items-center px-5 py-1 bg-yellow-400">
          {breadcrumbItems.map((item, index) => (
            <div className="flex items-center">
              <Link href={item.url} key={item.id}>
                <h3
                  className={`text-gray-500 text-sm font-semibold hover:text-gray-900 capitalize`}
                >
                  {item.name}
                </h3>
              </Link>
              {index !== breadcrumbItems.length - 1 && (
                <h2 className="mx-2">/</h2>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PageHeader;
