import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '../components/meals/MealsGrid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';
import MealsLoadingPage from './MealsLoadingPage';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

async function Meals() {
  const mealsData = await getMeals();
  const meals = mealsData.documents;
  // console.log('❤️', meals);

  return <MealsGrid meals={meals} />;
}

function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<MealsLoadingPage />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}

export default MealsPage;
