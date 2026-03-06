const Footer = () => {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground font-mono">
          Trailhead is in beta — built for BC backcountry hikers.{' '}
          <span className="hidden sm:inline">Have feedback?</span>{' '}
          <a href="mailto:hello@trailhead.app" className="text-primary hover:underline">
            hello@trailhead.app
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
