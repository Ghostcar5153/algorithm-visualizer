# Algorithm Visualizer

An interactive web-based visualization tool that demonstrates how different sorting algorithms work. Watch algorithms "dance" data into perfect order with stunning visual effects and real-time statistics.

## ✨ Features

### 🧠 Supported Algorithms
- **Bubble Sort** - Simple comparison-based algorithm
- **Selection Sort** - Finds minimum element repeatedly
- **Insertion Sort** - Builds sorted array one element at a time
- **Merge Sort** - Divide-and-conquer approach
- **Quick Sort** - Efficient partitioning algorithm
- **Heap Sort** - Uses binary heap data structure
- **Shell Sort** - Optimized insertion sort with gaps

### 🎨 Interactive Features
- **Real-time Visualization** - Watch bars dance as they get sorted
- **Adjustable Speed** - Control animation speed (1-100)
- **Variable Array Size** - Test with 10-150 elements
- **Live Statistics** - Track comparisons, swaps, accesses, and time
- **Algorithm Information** - Detailed explanations and complexity analysis
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Keyboard Shortcuts** - Space to start, R to shuffle, Escape to close modals

### 📊 Visual Indicators
- **🔍 Comparing** - Orange/red bars show elements being compared
- **🔄 Swapping** - Pulsing red bars indicate swaps
- **📌 Pivot** - Yellow bars highlight pivot elements
- **✅ Sorted** - Green bars show completed sections
- **📈 Progress Bar** - Shows sorting completion status

## 🚀 Live Demo

Try it out: [Algorithm Visualizer Demo](https://ghostcar5153.github.io/algorithm-visualizer)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Advanced styling with gradients, animations, and grid
- **Vanilla JavaScript** - ES6+ features and async/await
- **CSS Grid & Flexbox** - Responsive layout system
- **CSS Custom Properties** - Dynamic theming
- **Media Queries** - Mobile-first responsive design

## 📱 Responsive Design

The visualizer is fully responsive and optimized for:
- **Desktop** (1024px+) - Full side panel layout
- **Tablet** (768px-1024px) - Stacked layout
- **Mobile** (768px-) - Collapsible side menu

## 🎯 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ghostcar5153/algorithm-visualizer.git
   cd algorithm-visualizer
   ```

2. **Open in browser**
   ```bash
   # Option 1: Double-click index.html
   # Option 2: Use a local server
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Start visualizing!**
   - Select an algorithm from the dropdown
   - Adjust array size and speed
   - Click "Start Sort" or press Space
   - Watch the magic happen! ✨

## 🎮 How to Use

### Basic Controls
1. **Choose Algorithm** - Select from 7 different sorting algorithms
2. **Set Array Size** - Drag slider to change number of elements (10-150)
3. **Adjust Speed** - Control animation speed (1=slow, 100=fast)
4. **Shuffle** - Generate new random array
5. **Start Sort** - Begin the visualization
6. **Stop** - Halt the current sorting process

### Keyboard Shortcuts
- `Space` - Start sorting
- `R` - Shuffle array
- `Escape` - Close modal dialogs
- `?` (Algorithm Info button) - View detailed algorithm information

### Understanding the Visualization
- **Bar Height** - Represents the value of each element
- **Colors** - Different colors indicate different states (comparing, swapping, etc.)
- **Statistics Panel** - Shows real-time metrics
- **Complexity Panel** - Displays Big O notation for current algorithm

## 📊 Algorithm Complexity Reference

| Algorithm | Best Case | Average Case | Worst Case | Space |
|-----------|-----------|--------------|------------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |
| Shell Sort | O(n log n) | O(n^1.3) | O(n²) | O(1) |

## 🎨 Customization

### Color Scheme
The visualizer uses CSS custom properties for easy theming. Modify the `:root` variables in `style.css`:

```css
:root {
    --primary-color: #00ffff;      /* Cyan theme */
    --secondary-color: #ff6b6b;    /* Coral accents */
    --accent-color: #ffa500;       /* Orange highlights */
    --background-dark: #0a0a0a;    /* Dark background */
    /* ... more variables */
}
```

### Adding New Algorithms
1. Add the algorithm option to the HTML select element
2. Implement the sorting function in the `SortingVisualizer` class
3. Add algorithm information to the `getAlgorithmInfo()` method
4. Update the switch statement in `startSort()`

## 🏗️ Project Structure

```
algorithm-visualizer/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Sorting algorithms and interactions
└── README.md           # This file
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Ideas for Contributions
- Add more sorting algorithms (Radix Sort, Counting Sort, etc.)
- Implement searching algorithms visualization
- Add sound effects for operations
- Create algorithm race mode
- Add data structure visualizations
- Improve mobile UX

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic algorithm visualization tools
- Built with modern web technologies
- Designed for educational purposes

---

**⭐ If you found this helpful, please give it a star!**
