import { Anchor, Avatar, Badge, Box, Card, Container, Divider, Group, Stack, Text, Title} from "@mantine/core"
import { motion, Variants } from "framer-motion";
import { getTechnologyBadgeContent } from "../helpers/technologyBadges";
import styles from "../styles/sass/projects.module.scss"
export interface ProjectPost{
    title:string;
    description:string;
    image:string;
    id:string|number;
    technologies?:string[];
}

const cardVariants: Variants = {
    offscreen: {
      y: 300
    },
    onscreen: {
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

export const ProjectItem = ({title,description,image,id,technologies}:ProjectPost) => {

    return (
        <>
        <motion.div
        
      initial="offscreen"
      whileInView="onscreen"
    >

                    <motion.div className={styles.card} variants={cardVariants}>

            <Card radius='lg' mb={'xl'} shadow="md" className={styles["project-item"]} >
              <Container px="xs">
                <div className={styles.description}>
                  <Group>
                      <Avatar size="xl" bg="white" alt={title} src={image ? image : ""} radius="xl"/>
                  <Stack spacing={0} mb="md">

                      <Title order={2} style={{margin:0}}>
                        <Anchor sx={{color:"rgb(60,60,60)"}} href={`${window.location.origin}/p/${id}`}>{title}</Anchor>
                      </Title>
                    <Text color='dimmed'>{description}</Text>
                    <Box mt="sm">{technologies && technologies.map((technology)=>getTechnologyBadgeContent(technology)).map((technology)=><Badge key={technology.technology} leftSection={technology.icon} color={technology.color} px="sm" mx={5} variant='light'>{technology.technology}</Badge>)}</Box>

                    </Stack>
                    </Group>
                </div>
                </Container>
            </Card>
            
            </motion.div>

            

        </motion.div>


</>

    )
}