import { Link } from 'react-router-dom'

interface BreadCrumbItem{
  label: string;
  link: string;
  active?: boolean;
}

interface BreadCrumbsProps{
  items: BreadCrumbItem[];
  className?: string;
}

function BreadCrumbs({ items, className }: BreadCrumbsProps ) {

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className={`breadcrumb ${className ?? ""}`}>
          {items.map((item, index) => (
            <li
              key={index}
              className={`breadcrumb-item ${item.active ? "active" : ""}`}
              aria-current={item.active ? "page" : undefined}
            >
              {item.active || !item.link ? (
                item.label
              ) : (
                <Link to={item.link}>{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

export default BreadCrumbs