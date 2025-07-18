class SortingVisualizer {
    constructor() {
        this.array = [];
        this.isSorting = false;
        this.animationSpeed = 50;
        this.stats = { comparisons: 0, swaps: 0, accesses: 0, startTime: 0 };
        this.stopRequested = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.generateArray();
        this.updateAlgorithmInfo();
        this.setupMobileMenu();
    }

    initializeElements() {
        // Main elements
        this.barsContainer = document.getElementById('barsContainer');
        this.algorithmSelect = document.getElementById('algorithmSelect');
        this.arraySize = document.getElementById('arraySize');
        this.speed = document.getElementById('speed');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.sortBtn = document.getElementById('sortBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.progressBar = document.getElementById('progressBar');
        
        // Stats elements
        this.comparisonsEl = document.getElementById('comparisons');
        this.swapsEl = document.getElementById('swaps');
        this.accessesEl = document.getElementById('accesses');
        this.timeEl = document.getElementById('time');
        
        // Info elements
        this.bestCaseEl = document.getElementById('bestCase');
        this.avgCaseEl = document.getElementById('avgCase');
        this.worstCaseEl = document.getElementById('worstCase');
        this.spaceCaseEl = document.getElementById('spaceCase');
        
        // Modal elements
        this.modalOverlay = document.getElementById('modalOverlay');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDescription = document.getElementById('modalDescription');
        this.modalClose = document.getElementById('modalClose');
        this.algorithmInfoBtn = document.getElementById('algorithmInfoBtn');
        
        // Mobile menu elements
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.controlsPanel = document.getElementById('controlsPanel');
    }

    setupEventListeners() {
        // Main controls
        this.shuffleBtn.addEventListener('click', () => this.generateArray());
        this.sortBtn.addEventListener('click', () => this.startSort());
        this.stopBtn.addEventListener('click', () => this.stopSort());
        
        // Settings
        this.arraySize.addEventListener('input', (e) => {
            document.getElementById('arraySizeValue').textContent = e.target.value;
            if (!this.isSorting) this.generateArray();
        });
        
        this.speed.addEventListener('input', (e) => {
            document.getElementById('speedValue').textContent = e.target.value;
            this.animationSpeed = parseInt(e.target.value);
        });
        
        this.algorithmSelect.addEventListener('change', () => {
            this.updateAlgorithmInfo();
        });
        
        // Modal
        this.algorithmInfoBtn.addEventListener('click', () => this.showAlgorithmModal());
        this.modalClose.addEventListener('click', () => this.hideAlgorithmModal());
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) this.hideAlgorithmModal();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hideAlgorithmModal();
            if (e.key === ' ' && !this.isSorting) {
                e.preventDefault();
                this.startSort();
            }
            if (e.key === 'r' || e.key === 'R') {
                if (!this.isSorting) this.generateArray();
            }
        });
    }

    setupMobileMenu() {
        this.mobileMenuToggle.addEventListener('click', () => {
            this.mobileMenuToggle.classList.toggle('active');
            this.controlsPanel.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.controlsPanel.contains(e.target) && 
                !this.mobileMenuToggle.contains(e.target) && 
                this.controlsPanel.classList.contains('active')) {
                this.mobileMenuToggle.classList.remove('active');
                this.controlsPanel.classList.remove('active');
            }
        });
    }

    getAlgorithmInfo() {
        const algorithms = {
            bubble: {
                name: 'Bubble Sort',
                description: `
                    <h3>How it works:</h3>
                    <p>Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order. The pass through the list is repeated until the list is sorted.</p>
                    
                    <h3>Key characteristics:</h3>
                    <ul>
                        <li>Simple comparison-based algorithm</li>
                        <li>Large elements "bubble" to the end</li>
                        <li>Stable sorting algorithm</li>
                        <li>In-place sorting (requires only O(1) extra memory)</li>
                        <li>Can detect if list is already sorted</li>
                    </ul>
                    
                    <h3>When to use:</h3>
                    <p>Best for educational purposes and very small datasets. Not recommended for production use due to poor performance on large datasets.</p>
                `,
                best: 'O(n)',
                avg: 'O(n²)',
                worst: 'O(n²)',
                space: 'O(1)'
            },
            selection: {
                name: 'Selection Sort',
                description: `
                    <h3>How it works:</h3>
                    <p>Selection Sort divides the list into sorted and unsorted regions. It repeatedly finds the minimum element from the unsorted region and moves it to the beginning of the sorted region.</p>
                    
                    <h3>Key characteristics:</h3>
                    <ul>
                        <li>Performs exactly n-1 swaps for n elements</li>
                        <li>Not stable (relative order of equal elements may change)</li>
                        <li>In-place sorting algorithm</li>
                        <li>Performance doesn't depend on initial order</li>
                    </ul>
                    
                    <h3>When to use:</h3>
                    <p>Useful when memory writes are expensive, as it minimizes the number of swaps. Good for small datasets or when simplicity is valued over efficiency.</p>
                `,
                best: 'O(n²)',
                avg: 'O(n²)',
                worst: 'O(n²)',
                space: 'O(1)'
            },
            insertion: {
                name: 'Insertion Sort',
                description: `
                    <h3>How it works:</h3>
                    <p>Insertion Sort builds the final sorted array one element at a time. It takes each element from the unsorted portion and inserts it into its correct position in the sorted portion.</p>
                    
                    <h3>Key characteristics:</h3>
                    <ul>
                        <li>Efficient for small datasets</li>
                        <li>Adaptive (performs better on nearly sorted data)</li>
                        <li>Stable sorting algorithm</li>
                        <li>In-place and online algorithm</li>
                        <li>Similar to how humans sort playing cards</li>
                    </ul>
                    
                    <h3>When to use:</h3>
                    <p>Excellent for small arrays, nearly sorted data, or as a subroutine in hybrid algorithms like Quicksort. Often used in practice for small subarrays.</p>
                `,
                best: 'O(n)',
                avg: 'O(n²)',
                worst: 'O(n²)',
                space: 'O(1)'
            },
            merge: {
                name: 'Merge Sort',
                description: `
                    <h3>How it works:</h3>
                    <p>Merge Sort uses a divide-and-conquer approach. It divides the array into two halves, recursively sorts them, and then merges the sorted halves back together.</p>
                    
                    <h3>Key characteristics:</h3>
                    <ul>
                        <li>Guaranteed O(n log n) performance</li>
                        <li>Stable sorting algorithm</li>
                        <li>Divide-and-conquer strategy</li>
                        <li>Requires additional memory for merging</li>
                        <li>Predictable performance regardless of input</li>
                    </ul>
                    
                    <h3>When to use:</h3>
                    <p>Ideal when you need guaranteed O(n log n) performance, stability is important, or when dealing with large datasets. Commonly used in external sorting.</p>
                `,
                best: 'O(n log n)',
                avg: 'O(n log n)',
                worst: 'O(n log n)',
                space: 'O(n)'
            },
            quick: {
                name: 'Quick Sort',
                description: `
                    <h3>How it works:</h3>
                    <p>Quick Sort picks a 'pivot' element and partitions the array around it, placing smaller elements before and larger elements after the pivot. It then recursively sorts the sub-arrays.</p>
                    
                    <h3>Key characteristics:</h3>
                    <ul>
                        <li>Average case is very efficient</li>
                        <li>In-place sorting (with recursion stack)</li>
                        <li>Not stable (can change relative order)</li>
                        <li>Performance depends on pivot selection</li>
                        <li>Cache-efficient due to good locality</li>
                    </ul>
                    
                    <h3>When to use:</h3>
                    <p>One of the fastest general-purpose sorting algorithms in practice. Ideal for large datasets when average-case performance matters more than worst-case guarantees.</p>
                `,
                best: 'O(n log n)',
                avg: 'O(n log n)',
                worst: 'O(n²)',
                space: 'O(log n)'
            },
            heap: {
                name: 'Heap Sort',
                description: `
                    <h3>How it works:</h3>
                    <p>Heap Sort first builds a max heap from the input data, then repeatedly extracts the maximum element and places it at the end of the array, maintaining the heap property.</p>
                    
                    <h3>Key characteristics:</h3>
                    <ul>
                        <li>Guaranteed O(n log n) in all cases</li>
                        <li>In-place sorting algorithm</li>
                        <li>Not stable</li>
                        <li>Uses binary heap data structure</li>
                        <li>Good worst-case performance</li>
                    </ul>
                    
                    <h3>When to use:</h3>
                    <p>Useful when you need guaranteed O(n log n) performance with O(1) space complexity. Good choice for systems with memory constraints or real-time requirements.</p>
                `,
                best: 'O(n log n)',
                avg: 'O(n log n)',
                worst: 'O(n log n)',
                space: 'O(1)'
            },
            shell: {
                name: 'Shell Sort',
                description: `
                    <h3>How it works:</h3>
                    <p>Shell Sort is an optimization of Insertion Sort that allows exchanges of far-apart elements. It starts with large gaps and gradually reduces them, finishing with a gap of 1 (regular insertion sort).</p>
                    
                    <h3>Key characteristics:</h3>
                    <ul>
                        <li>Improved version of insertion sort</li>
                        <li>In-place sorting algorithm</li>
                        <li>Performance depends on gap sequence</li>
                        <li>Not stable</li>
                        <li>Adaptive to some degree</li>
                    </ul>
                    
                    <h3>When to use:</h3>
                    <p>Good middle-ground between simple O(n²) algorithms and complex O(n log n) algorithms. Useful when code simplicity is important but better performance than insertion sort is needed.</p>
                `,
                best: 'O(n log n)',
                avg: 'O(n^1.3)',
                worst: 'O(n²)',
                space: 'O(1)'
            }
        };
        
        return algorithms;
    }

    generateArray() {
        const size = parseInt(this.arraySize.value);
        this.array = Array.from({ length: size }, (_, i) => i + 1);
        
        // Fisher-Yates shuffle
        for (let i = this.array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        }
        
        this.renderBars();
        this.resetStats();
    }

    renderBars() {
        this.barsContainer.innerHTML = '';
        const containerWidth = this.barsContainer.clientWidth;
        const maxHeight = this.barsContainer.clientHeight - 20;
        const maxValue = Math.max(...this.array);
        const barWidth = Math.max(2, (containerWidth / this.array.length) - 1);
        
        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(value / maxValue) * maxHeight}px`;
            bar.style.width = `${barWidth}px`;
            bar.dataset.index = index;
            bar.dataset.value = value;
            this.barsContainer.appendChild(bar);
        });
    }

    async highlightBars(indices, className, duration = 100) {
        if (this.stopRequested) return;
        
        // Remove previous highlighting
        document.querySelectorAll('.bar').forEach(bar => {
            bar.classList.remove('comparing', 'swapping', 'pivot');
        });
        
        // Add new highlighting
        indices.forEach(index => {
            const bar = document.querySelector(`[data-index="${index}"]`);
            if (bar) bar.classList.add(className);
        });
        
        await this.delay(101 - this.animationSpeed);
    }

    async swap(i, j) {
        if (this.stopRequested) return;
        
        await this.highlightBars([i, j], 'swapping');
        
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        this.stats.swaps++;
        this.updateStats();
        
        // Visual swap with animation
        const bars = this.barsContainer.children;
        const bar1 = bars[i];
        const bar2 = bars[j];
        
        // Swap the visual elements
        const tempNextSibling = bar1.nextSibling;
        const tempParent = bar1.parentNode;
        
        bar2.parentNode.insertBefore(bar1, bar2.nextSibling);
        tempParent.insertBefore(bar2, tempNextSibling);
        
        // Update data attributes
        bar1.dataset.index = j;
        bar2.dataset.index = i;
        
        await this.delay(50);
    }

    async compare(i, j) {
        this.stats.comparisons++;
        this.stats.accesses += 2;
        this.updateStats();
        await this.highlightBars([i, j], 'comparing');
        return this.array[i] > this.array[j];
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    resetStats() {
        this.stats = { comparisons: 0, swaps: 0, accesses: 0, startTime: 0 };
        this.updateStats();
        this.progressBar.style.width = '0%';
    }

    updateStats() {
        this.comparisonsEl.textContent = this.stats.comparisons.toLocaleString();
        this.swapsEl.textContent = this.stats.swaps.toLocaleString();
        this.accessesEl.textContent = this.stats.accesses.toLocaleString();
        
        if (this.stats.startTime) {
            const elapsed = (Date.now() - this.stats.startTime) / 1000;
            this.timeEl.textContent = elapsed.toFixed(1) + 's';
        }
    }

    updateProgress(current, total) {
        const percentage = (current / total) * 100;
        this.progressBar.style.width = percentage + '%';
    }

    updateAlgorithmInfo() {
        const algorithm = this.algorithmSelect.value;
        const info = this.getAlgorithmInfo()[algorithm];
        
        this.bestCaseEl.textContent = info.best;
        this.avgCaseEl.textContent = info.avg;
        this.worstCaseEl.textContent = info.worst;
        this.spaceCaseEl.textContent = info.space;
    }

    showAlgorithmModal() {
        const algorithm = this.algorithmSelect.value;
        const info = this.getAlgorithmInfo()[algorithm];
        
        this.modalTitle.textContent = info.name;
        this.modalDescription.innerHTML = info.description;
        
        document.getElementById('modalBestCase').textContent = info.best;
        document.getElementById('modalAvgCase').textContent = info.avg;
        document.getElementById('modalWorstCase').textContent = info.worst;
        document.getElementById('modalSpaceCase').textContent = info.space;
        
        this.modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideAlgorithmModal() {
        this.modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    async startSort() {
        if (this.isSorting) return;
        
        this.isSorting = true;
        this.stopRequested = false;
        this.stats.startTime = Date.now();
        
        this.sortBtn.disabled = true;
        this.stopBtn.disabled = false;
        this.shuffleBtn.disabled = true;
        this.algorithmSelect.disabled = true;
        this.arraySize.disabled = true;
        
        // Close mobile menu if open
        this.mobileMenuToggle.classList.remove('active');
        this.controlsPanel.classList.remove('active');
        
        const algorithm = this.algorithmSelect.value;
        
        try {
            switch (algorithm) {
                case 'bubble':
                    await this.bubbleSort();
                    break;
                case 'selection':
                    await this.selectionSort();
                    break;
                case 'insertion':
                    await this.insertionSort();
                    break;
                case 'merge':
                    await this.mergeSort(0, this.array.length - 1);
                    break;
                case 'quick':
                    await this.quickSort(0, this.array.length - 1);
                    break;
                case 'heap':
                    await this.heapSort();
                    break;
                case 'shell':
                    await this.shellSort();
                    break;
            }
            
            if (!this.stopRequested) {
                await this.celebrateSorted();
            }
        } catch (error) {
            console.error('Sorting error:', error);
        }
        
        this.isSorting = false;
        this.sortBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.shuffleBtn.disabled = false;
        this.algorithmSelect.disabled = false;
        this.arraySize.disabled = false;
        this.updateProgress(100, 100);
    }

    stopSort() {
        this.stopRequested = true;
    }

    async celebrateSorted() {
        // Highlight all bars as sorted
        for (let i = 0; i < this.array.length; i++) {
            if (this.stopRequested) break;
            const bar = document.querySelector(`[data-index="${i}"]`);
            if (bar) bar.classList.add('sorted');
            await this.delay(20);
        }
    }

    // Sorting Algorithms
    async bubbleSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            if (this.stopRequested) break;
            let swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                if (this.stopRequested) break;
                if (await this.compare(j, j + 1)) {
                    await this.swap(j, j + 1);
                    swapped = true;
                }
            }
            this.updateProgress(i + 1, n);
            if (!swapped) break;
        }
    }

    async selectionSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            if (this.stopRequested) break;
            let minIdx = i;
            await this.highlightBars([i], 'pivot');
            
            for (let j = i + 1; j < n; j++) {
                if (this.stopRequested) break;
                await this.highlightBars([minIdx, j], 'comparing');
                if (this.array[j] < this.array[minIdx]) {
                    minIdx = j;
                }
                this.stats.comparisons++;
                this.stats.accesses += 2;
                this.updateStats();
            }
            
            if (minIdx !== i) {
                await this.swap(i, minIdx);
            }
            this.updateProgress(i + 1, n);
        }
    }

    async insertionSort() {
        const n = this.array.length;
        for (let i = 1; i < n; i++) {
            if (this.stopRequested) break;
            let key = this.array[i];
            let j = i - 1;
            
            await this.highlightBars([i], 'pivot');
            
            while (j >= 0 && this.array[j] > key) {
                if (this.stopRequested) break;
                await this.highlightBars([j, j + 1], 'comparing');
                this.array[j + 1] = this.array[j];
                this.stats.swaps++;
                this.stats.comparisons++;
                this.stats.accesses += 3;
                this.updateStats();
                
                // Visual update
                this.renderBars();
                await this.delay(101 - this.animationSpeed);
                j--;
            }
            this.array[j + 1] = key;
            this.renderBars();
            this.updateProgress(i + 1, n);
        }
    }

    async mergeSort(left, right) {
        if (left >= right || this.stopRequested) return;
        
        const mid = Math.floor((left + right) / 2);
        await this.mergeSort(left, mid);
        await this.mergeSort(mid + 1, right);
        await this.merge(left, mid, right);
        
        this.updateProgress(right - left + 1, this.array.length);
    }

    async merge(left, mid, right) {
        if (this.stopRequested) return;
        
        const leftArr = this.array.slice(left, mid + 1);
        const rightArr = this.array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            if (this.stopRequested) break;
            await this.highlightBars([k], 'comparing');
            
            if (leftArr[i] <= rightArr[j]) {
                this.array[k] = leftArr[i];
                i++;
            } else {
                this.array[k] = rightArr[j];
                j++;
            }
            this.stats.comparisons++;
            this.stats.accesses += 3;
            this.updateStats();
            k++;
            this.renderBars();
            await this.delay(101 - this.animationSpeed);
        }
        
        while (i < leftArr.length) {
            if (this.stopRequested) break;
            this.array[k] = leftArr[i];
            i++;
            k++;
        }
        
        while (j < rightArr.length) {
            if (this.stopRequested) break;
            this.array[k] = rightArr[j];
            j++;
            k++;
        }
        
        this.renderBars();
    }

    async quickSort(low, high) {
        if (low < high && !this.stopRequested) {
            const pi = await this.partition(low, high);
            await this.quickSort(low, pi - 1);
            await this.quickSort(pi + 1, high);
            this.updateProgress(high - low + 1, this.array.length);
        }
    }

    async partition(low, high) {
        const pivot = this.array[high];
        await this.highlightBars([high], 'pivot');
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            if (this.stopRequested) break;
            await this.highlightBars([j, high], 'comparing');
            if (this.array[j] < pivot) {
                i++;
                if (i !== j) {
                    await this.swap(i, j);
                }
            }
            this.stats.comparisons++;
            this.stats.accesses += 2;
            this.updateStats();
        }
        
        if (i + 1 !== high) {
            await this.swap(i + 1, high);
        }
        return i + 1;
    }

    async heapSort() {
        const n = this.array.length;
        
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            if (this.stopRequested) break;
            await this.heapify(n, i);
        }
        
        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            if (this.stopRequested) break;
            await this.swap(0, i);
            await this.heapify(i, 0);
            this.updateProgress(n - i, n);
        }
    }

    async heapify(n, i) {
        if (this.stopRequested) return;
        
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        
        if (left < n && this.array[left] > this.array[largest]) {
            largest = left;
        }
        
        if (right < n && this.array[right] > this.array[largest]) {
            largest = right;
        }
        
        if (largest !== i) {
            await this.swap(i, largest);
            await this.heapify(n, largest);
        }
        
        this.stats.comparisons += 2;
        this.stats.accesses += 4;
        this.updateStats();
    }

    async shellSort() {
        const n = this.array.length;
        
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            if (this.stopRequested) break;
            
            for (let i = gap; i < n; i++) {
                if (this.stopRequested) break;
                
                let temp = this.array[i];
                let j = i;
                
                await this.highlightBars([i], 'pivot');
                
                while (j >= gap && this.array[j - gap] > temp) {
                    if (this.stopRequested) break;
                    await this.highlightBars([j, j - gap], 'comparing');
                    this.array[j] = this.array[j - gap];
                    this.stats.comparisons++;
                    this.stats.accesses += 3;
                    this.updateStats();
                    j -= gap;
                    this.renderBars();
                    await this.delay(101 - this.animationSpeed);
                }
                
                this.array[j] = temp;
                this.renderBars();
            }
            this.updateProgress(n - gap, n);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.sortingVisualizer = new SortingVisualizer();
});

// Handle window resize
window.addEventListener('resize', () => {
    const visualizer = window.sortingVisualizer;
    if (visualizer && !visualizer.isSorting) {
        visualizer.renderBars();
    }
});