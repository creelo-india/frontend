export default function HomePage() {
  return (
    <main className="homepage">
      <div className="container">
        <section className="hero-section">
          <h1>Welcome to Creelo India</h1>
          <p className="lead">
            Your trusted e-commerce destination for quality products
          </p>
        </section>

        <section className="features-section">
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card">
                <h2>Wide Selection</h2>
                <p>Browse through thousands of products across multiple categories</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <h2>Fast Delivery</h2>
                <p>Quick and reliable shipping to your doorstep</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <h2>Secure Shopping</h2>
                <p>Safe and secure payment options for your peace of mind</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
