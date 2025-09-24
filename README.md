# 🌸 BloomWatch - Flower Blooming Tracking App

A comprehensive Next.js application for tracking, analyzing, and predicting flower blooming patterns with interactive visualizations and AI-powered insights.

![BloomWatch Logo](public/bloomwatch-logo.png)

## 🌟 Features

### 📊 **Analytics Dashboard**
- Real-time bloom tracking with interactive charts
- Climate correlation analysis
- Seasonal pattern visualization
- Species distribution mapping
- Timeline and Gantt chart views

### 🗺️ **Interactive Map**
- Geographic bloom tracking
- Location-based bloom predictions
- Regional climate data integration
- Interactive scatter plots

### 🎯 **Achievement System**
- Bloom tracking milestones
- Seasonal challenges
- Progress badges and rewards
- Gamified learning experience

### 🤖 **AI Insights Panel**
- Predictive bloom modeling
- Climate impact analysis
- Personalized recommendations
- Smart notifications

### 📚 **Learning Center**
- Educational content about flowers
- Blooming patterns and cycles
- Climate impact on flora
- Gardening tips and guides

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sohamsharma21/bloomwatch.git
   cd bloomwatch
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to https://bloomwatch-1asu9ev4t-iblis-projects.vercel.app/

## 🏗️ Project Structure

```
bloomwatch-app/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── challenge/         # Challenge page
│   ├── dashboard/         # Main dashboard
│   ├── explorer/         # Data explorer
│   ├── timeline/         # Timeline view
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── charts/           # Chart components
│   ├── ui/               # UI components (shadcn/ui)
│   └── ...               # Feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and data
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🎨 Key Components

### Charts & Visualizations
- **Bloom Heatmap**: Visual representation of bloom patterns
- **Climate Chart**: Temperature and humidity correlations
- **Comparison Chart**: Multi-species comparisons
- **Distribution Chart**: Geographic bloom distribution
- **Interactive Scatter**: Interactive data exploration
- **Radar Analysis**: Multi-dimensional bloom analysis
- **Seasonal Chart**: Seasonal pattern visualization
- **Species Chart**: Species-specific analytics
- **Timeline Gantt**: Timeline-based bloom tracking

### Core Features
- **Bloom Tracker**: Main tracking interface
- **Interactive Map**: Geographic bloom visualization
- **Achievement System**: Gamification elements
- **AI Insights Panel**: Smart recommendations
- **Learning Center**: Educational content
- **Prediction Card**: Bloom forecasting

## 🎯 Usage

### Dashboard
- View real-time bloom data
- Analyze seasonal patterns
- Track progress and achievements

### Explorer
- Explore detailed bloom data
- Filter by species, location, or time
- Export data for analysis

### Timeline
- View bloom events chronologically
- Track long-term patterns
- Identify seasonal trends

### Challenges
- Participate in bloom tracking challenges
- Earn achievements and badges
- Compete with other users

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_MAP_API_KEY=your_map_api_key
```

### Customization
- Modify `lib/data.ts` for sample data
- Update `components/charts/` for custom visualizations
- Customize themes in `components/theme-provider.tsx`

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices
- 💻 Desktop computers
- 📟 Tablets
- 🖥️ Large screens

## 🎨 Themes

- 🌞 Light mode
- 🌙 Dark mode
- 🎨 Custom themes support

## 🚀 Deployment

### Vercel (Live!)
✅ **Successfully Deployed!**
- **Live URL:** https://bloomwatch-1asu9ev4t-iblis-projects.vercel.app/
- **Dashboard:** https://bloomwatch-1asu9ev4t-iblis-projects.vercel.app/dashboard
- **Features:** https://bloomwatch-1asu9ev4t-iblis-projects.vercel.app/features
- **GitHub:** https://github.com/sohamsharma21/bloomwatch

### Manual Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `pnpm build`
2. Deploy the `out` folder to Netlify

### Docker
```bash
docker build -t bloomwatch .
docker run -p 3000:3000 bloomwatch
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Recharts](https://recharts.org/) for interactive charts
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the maintainers
- Check the documentation

## 🔮 Future Enhancements

- [ ] Real-time data integration
- [ ] Machine learning predictions
- [ ] Mobile app development
- [ ] Social features and sharing
- [ ] Advanced analytics
- [ ] Weather API integration
- [ ] User authentication
- [ ] Data export features

---

Made with ❤️ for flower enthusiasts and nature lovers! 🌸🌺🌻
