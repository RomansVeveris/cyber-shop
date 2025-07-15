import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AnimatedBlock({ children, y = 30, duration = 0.6, delay = 0, animationKey }) {
    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.15,
    });
    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0, y}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration, delay, ease:'easeOut'}}
            className="animated-component"
            >
            {children}
            </motion.div>
    );
}