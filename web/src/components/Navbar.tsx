import { useState } from 'react';
import * as Routes from './utils/routes';
import { AdminMenu } from '../typings/adminMenu';

interface CategoryProps {
  name: string;
  icon?: string;
  isActive?: boolean;
  props?: Record<string, any>;
}

const Navbar: React.FC<{
  props: AdminMenu | undefined;
}> = ({ props }) => {
  const [categories, setCategories] = useState<CategoryProps[]>([
    {
      name: 'dashboard',
      icon: 'fa-solid fa-house',
      isActive: true,
      props: {
        props,
        allPlayers: () => setCategories(() => categories.map((c) => ({ ...c, isActive: c.name === 'players' }))),
      },
    },
    { name: 'players', icon: 'fa-solid fa-users' },
  ]);

  const activeCategory = categories.find((c) => c.isActive)?.name || 'Dashboard';
  const activeCategoryProps = categories.find((c) => c.isActive)?.props || {};
  const ActiveComponent = (Routes as unknown as Record<string, React.FC>)[
    activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
  ];

  return (
    <div className="h-5/6 overflow-x-hidden flex">
      <div className="px-10 w-fit flex flex-col gap-4 h-full">
        {categories.map((category, index) => (
          <div key={`category-${index}`} className="">
            <i
              className={`${category.icon || 'fa-solid fa-question'} text-white border-2 w-10 h-10 flex items-center justify-center rounded-full 
                        ${category.isActive ? 'border-lime-500 bg-lime-500/10' : 'bg-neutral-400/10 border-neutral-500'} hover:border-lime-500 hover:bg-lime-500/10 cursor-pointer duration-200`}
              onClick={() => setCategories(() => categories.map((c) => ({ ...c, isActive: c.name === category.name })))}
            ></i>
          </div>
        ))}
      </div>
      <div className="w-full font-[Inter]">{ActiveComponent ? <ActiveComponent {...activeCategoryProps} /> : null}</div>
    </div>
  );
};

export default Navbar;
