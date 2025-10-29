import { Router, type Request, type Response } from 'express';
import prisma from '../db.js';
import { authenticate } from '../utils/index.js';

const router = Router();

// Get all RSVPs for current user
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const rsvps = await prisma.rSVP.findMany({
      where: { userId: req.user!.userId },
      include: {
        event: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            _count: {
              select: {
                rsvps: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(rsvps);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// Create RSVP
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { eventId, status = 'going' } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) }
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if RSVP already exists
    const existingRSVP = await prisma.rSVP.findUnique({
      where: {
        userId_eventId: {
          userId: req.user!.userId,
          eventId: parseInt(eventId)
        }
      }
    });

    if (existingRSVP) {
      // Update existing RSVP
      const updatedRSVP = await prisma.rSVP.update({
        where: { id: existingRSVP.id },
        data: { status },
        include: {
          event: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          }
        }
      });

      return res.json({
        message: 'RSVP updated successfully',
        rsvp: updatedRSVP
      });
    }

    // Create new RSVP
    const rsvp = await prisma.rSVP.create({
      data: {
        userId: req.user!.userId,
        eventId: parseInt(eventId),
        status
      },
      include: {
        event: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    res.status(201).json({
      message: 'RSVP created successfully',
      rsvp
    });
  } catch (error) {
    console.error('Create RSVP error:', error);
    res.status(500).json({ message: 'Error creating RSVP' });
  }
});

// Update RSVP status
router.put('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const rsvp = await prisma.rSVP.findUnique({
      where: { id: parseInt(id) }
    });

    if (!rsvp) {
      return res.status(404).json({ message: 'RSVP not found' });
    }

    if (rsvp.userId !== req.user!.userId) {
      return res.status(403).json({ message: 'You can only update your own RSVPs' });
    }

    const updatedRSVP = await prisma.rSVP.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        event: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    res.json({
      message: 'RSVP updated successfully',
      rsvp: updatedRSVP
    });
  } catch (error) {
    console.error('Update RSVP error:', error);
    res.status(500).json({ message: 'Error updating RSVP' });
  }
});

// Cancel RSVP
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const rsvp = await prisma.rSVP.findUnique({
      where: { id: parseInt(id) }
    });

    if (!rsvp) {
      return res.status(404).json({ message: 'RSVP not found' });
    }

    if (rsvp.userId !== req.user!.userId) {
      return res.status(403).json({ message: 'You can only cancel your own RSVPs' });
    }

    await prisma.rSVP.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'RSVP cancelled successfully' });
  } catch (error) {
    console.error('Cancel RSVP error:', error);
    res.status(500).json({ message: 'Error cancelling RSVP' });
  }
});

export default router;