import Head from 'next/head';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import { useState, useEffect } from 'react';
import store2 from 'store2';
import Router from 'next/router';
import App from '../../src/components/App';
import axios from '../../src/services/axios';

const Recommended = () => {
  const [recommendations, setRecommendations] = useState([]);
  let userName = store2.session.get('username');

  useEffect(() => {
    if(!userName) {
      Router.replace({
        pathname: '/signin',
        query: { Recommended: 'true' },
      });
    } else {
        const userOrders = store2.session.get('userOrders') || [];
        axios.get('/api/recommended', { params: { userName } })
        .then((res) => {
            const { recommendations } = res.data;
            setRecommendations([...recommendations])
        })
        .catch((e) => {
          setRecommendations([])
        })
    }
  }, []);

  if(!userName) {
    return <></>;
  }
  return (
    <>
      <Head>
        <title>StackDemo</title>
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main className="fit">
        <div className="mx-auto max-w-8xl px-6">
          <div className="flex-1 p-10 flex flex-col justify-center items-center orders-listing">
            {recommendations.length === 0 ? (
              <>
                <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">No recommendations found</h2>
              </>
            ) : orders.map((order) => (
              <div id={order.id} key={order.id} className="a-box-group a-spacing-base order">
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};


export default Recommended;
