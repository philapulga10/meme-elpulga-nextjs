import Link from "next/link";
import React from "react";
import { useGlobalState } from "../../state";

export default function HeaderMenu() {
  const [categories] = useGlobalState('categories');

  return (
    <nav>
      <ul className="ass1-header__menu">
        <li>
          <a href="#">Danh mục</a>
          <div className="ass1-header__nav">
            <div className="container">
              <ul>
                {
                  categories.map((category) => {
                    return (
                      <li key={category.id} >
                        <Link href="/categories/[cateId]" as={`/categories/${category.id}`}>
                          <a>{category.text}</a>
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="ass1-header__menu-transition"></div>
          </div>
        </li>
      </ul>
    </nav>
  );
};